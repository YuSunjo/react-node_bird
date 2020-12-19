import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu ,Input, Row, Col } from 'antd';

import UserProfile from '../components/UserProfile'
import LoginForm from '../components/LoginForm'


const AppLayout = ( {children} ) => {
    const [isLoggedin, setIsLoggedin] = useState(false)

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle'}}/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {/* 반응형  xs: 모바일 sm: 테블릿 md: 작은데스크탑  24가 100% */}
            {/* gutter 컨텐츠들끼리의 padding  */}
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedin ? <UserProfile /> : <LoginForm />}
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
