import React ,{useCallback, useState, useRef} from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector,useDispatch } from 'react-redux'
import {addPost} from '../reducers/post'

function PostForm() {

    const {imagePaths } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text , setText] = useState('');
    const imageInput = useRef();
    
    const onChangeText = useCallback((e) => {
        setText(e.target.value)
    },[]);
    const onSubmit =useCallback( () => {
        dispatch(addPost);
        setText('');
    },[]);

    const onClickImageUpload = useCallback( () => {
        imageInput.current.click()
    },[imageInput.current]);

    return (
        <Form style ={{margin: '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value = {text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="나는 공부중!"
            />
            <div>
                {/* 버튼 눌러서 이미지창 띄우기  type이 file인 것을 hidden했다가 ref로 클릭해줌 */}
                <input type="file" multiple hidden ref ={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float: 'right'}} htmlType="submit">쨱쨱</Button>
            </div>
            <div>
                {imagePaths.map( (v) => (
                    <div key={v} style={{display: 'inline-block'}}>
                        <img src={v} style={{width:'200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    )   
}

export default PostForm
