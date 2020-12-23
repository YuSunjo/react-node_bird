import {all ,fork ,takeLatest, call ,delay} from 'redux-saga/effects'
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    generateDummyPost,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
  } from '../reducers/post';

//addPost
// function addPostAPI (data) {
//     return axios.post('/api/post',data)
// }

function* addPost(action) {
    try{
        // const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data,
            // data: result.data
        });
    }catch(err){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })
    }     
}
//Comment
// function addCommentAPI (data) {
//     return axios.post(`/api/post/${data.postId}/comment`,data)
// }

function* addComment(action) {
    try{
        // const result = yield call(addPostAPI,action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        });
    }catch(err){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }     
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* () {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}