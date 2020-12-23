import {all, fork,takeLatest, call, delay, put} from 'redux-saga/effects';
import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
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


function logInAPI (data) {
    return axios.post('/api/login',data)
}

//call이 함수를 부를 때는 logInAPI(action.data)  => call(logInAPI,action.data)  : 함수 , 인수들...
function* logIn(action) {
    console.log('saga-login');
    try{
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
            // data: result.data
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
    return axios.post('/api/logout')
}

function* logOut() {
    try{
        // const result = yield call(logOutAPI);
        yield delay(1000);
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

function signUpAPI () {
    return axios.post('/api/signup')
}

function* signUp() {
    try{
        // const result = yield call(signUpAPI);
        yield delay(1000);
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

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}  
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}