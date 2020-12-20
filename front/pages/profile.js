import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const profile = ()=> {

    const followerList=[{nickname: 'sunjo'}, {nickname: 'sunjo2'}, {nickname: 'sunjo3'}, ];
    const followingList=[{nickname: 'sunjo'}, {nickname: 'sunjo2'}, {nickname: 'sunjo3'}, ];

    return (
        <>
            <Head>
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm /> 
                <FollowList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
            </AppLayout>
        </>
    )
}

export default profile
