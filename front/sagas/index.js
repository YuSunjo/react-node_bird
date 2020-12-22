//generator  => 밑에 예시
// const gen = function* () {
//     console.log(1);
//     yield;
//     console.log(2);
//     yield;
//     console.log(3);
//     yield 4;
// }
// const generator = gen();
// generator.next();

//무한으로 계속 뽑음 , 이벤트리스너처럼 활용가능 
//let i=0;
// const gen = function* () {
//     while (true){
//         yield i++;
//     }
// }
import {all ,fork, call, put, take } from 'redux-saga/effects'
import axios from 'axios';

function logInAPI (data) {
    return axios.post('/api/login',data)
}

//call이 함수를 부를 때는 logInAPI(action.data)  => call(logInAPI,action.data)  : 함수 , 인수들...
function* logIn(action) {
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        });
    }catch(err){
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        })
    }     
}

//logOut
function logOutAPI () {
    return axios.post('/api/logout')
}

function* logOut() {
    try{
        const result = yield call(logOutAPI);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data
        });
    }catch(err){
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        })
    }     
}

//addPost
function addPostAPI (data) {
    return axios.post('/api/post',data)
}

function* addPost(action) {
    try{
        const result = yield call(addPostAPI,action.data);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data
        });
    }catch(err){
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data
        })
    }     
}

//fork 비동기 함수 호출
//call 동기 함수 호출 
//put 은 dispatch같은 역할 
//take LOG_IN action이 시작 될때까지 기다리겠다. 
function* watchLogin() {
    yield take('LOG_IN_REQUEST', logIn);
}
function* watchLogOut() {
    yield take('LOG_OUT_REQUEST', logOut);
}
function* watchAddPost() {
    yield take('ADD_POST_REQUEST', addPost);
}

//fork는 함수를 실행해줌  call 과는 약간 다름 
export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchAddPost),
    ])
}