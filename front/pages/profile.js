import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'

const profile = ()=> {
    return (
        <>
            <Head>
                <title>프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                profile
            </AppLayout>
        </>
    )
}

export default profile
