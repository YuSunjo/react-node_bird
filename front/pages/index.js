import {useSelector} from 'react-redux'

import AppLayout from "../components/AppLayout";
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

//Next 는 import React from 'react'이게 필요가 없다.
const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);
    return (
        <AppLayout>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
        </AppLayout>
    )

}

export default Home;