import React ,{useCallback, useState, useRef, useEffect} from 'react';
import { Button, Form, Input } from 'antd';
import { useSelector,useDispatch } from 'react-redux'
import {addPost, UPLOAD_IMAGES_REQUEST} from '../reducers/post'
import useInput from '../hooks/useInput';

function PostForm() {

    const {imagePaths, addPostDone,addPostLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const [text,onChangeText , setText] = useInput('');
    const imageInput = useRef();

    useEffect(() => {
        if(addPostDone){
            setText('');
        }
    }, [addPostDone])
    
    const onSubmit =useCallback( () => {
        dispatch(addPost(text));
    },[text]);

    const onClickImageUpload = useCallback( () => {
        imageInput.current.click()
    },[imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        //FormData에 foreach문 못쓰지만 빌려쓰는 느낌(?)
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    })

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
                <input type="file" name="image" multiple hidden ref ={imageInput} onChange={onChangeImages} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float: 'right'}} htmlType="submit" loading={addPostLoading}>쨱쨱</Button>
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
