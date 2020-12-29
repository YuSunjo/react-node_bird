import {all, fork,takeLatest,delay, put, call} from 'redux-saga/effects';
import axios from 'axios'
import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
  } from '../reducers/user';

function loadUserAPI () {
    return axios.get('/user');
}

function* loadUser(action) {
    try{
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data
        });
    }catch(err){
        yield put({
            type: LOAD_USER_FAILURE,
            error: err.response.data
        })
    }     
}

function logInAPI (data) {
    return axios.post('/user/login',data)
}

//call이 함수를 부를 때는 logInAPI(action.data)  => call(logInAPI,action.data)  : 함수 , 인수들...
function* logIn(action) {
    console.log('saga-login');
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        });
    }catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }     
}

//logOut
function logOutAPI () {
    return axios.post('/user/logout')
}

function* logOut() {
    try{
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        });
    }catch(err){
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }     
}

function signUpAPI (data) {
    return axios.post('/user', data);
}

function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data);
        console.log(result)
        yield put({
            type: SIGN_UP_SUCCESS,
            // data: result.data
        });
    }catch(err){
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        })
    }     
}

function followAPI () {
    return axios.post('/api/signup')
}

function* follow(action) {
    try{
        // const result = yield call(followAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
            // data: result.data
        });
    }catch(err){
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        })
    }     
}

function unfollowAPI () {
    return axios.post('/api/signup')
}

function* unfollow(action) {
    try{
        // const result = yield call(unfollowAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
            // data: result.data
        });
    }catch(err){
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }     
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}  
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}