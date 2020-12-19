import React,{useState ,useCallback} from 'react';
import { Button, Form, Input } from 'antd'
import Link from 'next/link'

const LoginForm =() => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('')


    const onChangeId = useCallback( (e) => {
        setId(e.target.value)
    },[]);

    const onChangePassword = useCallback( (e) => {
        setId(e.target.value)
    },[]);
    //react form 라이브러리도 있다.
    return (
        <Form>
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
            <div>
                <Button type="primary" htmlFor="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
            <div>
                
            </div>
        </Form>
    )
}

export default LoginForm;
