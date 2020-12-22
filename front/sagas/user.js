import {all, fork,takeLatest, call, delay} from 'redux-saga/effects';


function logInAPI (data) {
    return axios.post('/api/login',data)
}

//call이 함수를 부를 때는 logInAPI(action.data)  => call(logInAPI,action.data)  : 함수 , 인수들...
function* logIn(action) {
    try{
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            // data: result.data
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
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            // data: result.data
        });
    }catch(err){
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        })
    }     
}

function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}  
function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
    ])
}