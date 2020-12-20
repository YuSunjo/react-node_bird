import React,{useState ,useCallback} from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'

import {loginAction} from '../reducers/user';

//인라인으로 쓰면 객체가 계속 생성되서 리랜더링이 된다. 
const ButtonWrapper = styled.div`
    margin-top : 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm =() => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction({id, password}));
    },[id,password]);

    //react form 라이브러리도 있다.
    //onFinish는 e.preventDefault가 적용이 되어 있다. 
    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password" value={password} onChange={onChangePassword} required/>
            </div>
            {/* const style = useMemo(() => ({marginTop: 10}),[]);   -----useMemo로 해도 됨 */}
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
            <div>
                
            </div>
        </FormWrapper>
    )
}

export default LoginForm;
