import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu ,Input, Row, Col } from 'antd';
import styled, {createGlobalStyle} from 'styled-components'
import {useSelector} from 'react-redux'

import useInput from '../hooks/useInput';
import Router from 'next/router';

import UserProfile from '../components/UserProfile'
import LoginForm from '../components/LoginForm'


//gutter와 margin-left , right 때문에 스크롤 생김 
const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left : 0 !important;
    }

    .ant-col: first-child{
        padding-left: 0!important;
    }

    .ant-col: last-child {
        padding-right: 0 !important;
    }
`;

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;


const AppLayout = ( {children} ) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [searchInput, onChangeSearchInput] = useInput('');

    
    //구조분해 할 수도 있다. 
    const { me } =useSelector((state) => state.user);
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const onSearch = useCallback(() => {
        console.log('searchInput',searchInput);
        Router.push(`/hashtag/${searchInput}`)
    },[searchInput])

    return (
        <div>
            <Global />
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {/* 반응형  xs: 모바일 sm: 테블릿 md: 작은데스크탑  24가 100% */}
            {/* gutter 컨텐츠들끼리의 padding  */}
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    오른쪽 메뉴
                </Col>
            </Row>
            
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout
