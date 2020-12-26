import {useDispatch, useSelector} from 'react-redux'

import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useEffect } from 'react';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

//Next 는 import React from 'react'이게 필요가 없다.
const Home = () => {

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePost ,loadPostsLoading } = useSelector((state) => state.post);


    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    },[]);

    useEffect(() => {
        function onScroll() {
            //스크롤 할 때 아래 3개를 제일 많이 씀
            //react-virualized도 있음  
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight-300){
                if(hasMorePost && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll')
        }
    },[hasMorePost, loadPostsLoading])


    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
        </AppLayout>
    )

}

export default Home;