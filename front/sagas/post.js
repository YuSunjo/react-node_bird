import {all ,fork ,takeLatest, call ,delay} from 'redux-saga/effects'

//addPost
function addPostAPI (data) {
    return axios.post('/api/post',data)
}

function* addPost(action) {
    try{
        // const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
            // data: result.data
        });
    }catch(err){
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data
        })
    }     
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* () {
    yield all([
        fork(watchAddPost)
    ])
}