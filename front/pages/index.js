import {useDispatch, useSelector} from 'react-redux'
import {END} from 'redux-saga';

import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useEffect } from 'react';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';

//Next 는 import React from 'react'이게 필요가 없다.
const Home = () => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost ,loadPostsLoading, retweetError} = useSelector((state) => state.post);

    useEffect(() => {
        if(retweetError){
            alert(retweetError);
        }
    },[retweetError]) 

    useEffect(() => {
        function onScroll() {
            //스크롤 할 때 아래 3개를 제일 많이 씀
            //react-virualized도 있음  
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                if(hasMorePost && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length -1]?.id
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[hasMorePost, loadPostsLoading, mainPosts])


    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
        </AppLayout>
    )

}

//화면을 그리기 전에 서버쪽에서 먼저 실행
//dispatch 해준 부분을 hydrate로 보내줌 
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    //쿠키까지 전달해야지 로그인이 유지된다.
    //그냥 axios.defaults.headers.Cookie = cookie로 하면 내 로그인 정보를 다른 사람이 다 쓰게 된다...
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Home;