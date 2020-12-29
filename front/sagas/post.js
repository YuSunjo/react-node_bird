import {all ,fork ,takeLatest,delay, put, throttle, call} from 'redux-saga/effects'
import axios from 'axios'
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

    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    
  } from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

// addPost
function addPostAPI (data) {
    return axios.post('/post',{content: data});
}

function* addPost(action) {
    try{
        const result = yield call(addPostAPI,action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    }catch(err){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }     
}

//removePost
// function removePostAPI (data) {
//     return axios.delete('/api/post',data)
// }

function* removePost(action) {
    try{
        // const result = yield call(removePostAPI,action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    }catch(err){
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
        });
    }     
}
// Comment
function addCommentAPI (data) {
    return axios.post(`/post/${data.postId}/comment`,data);
}

function* addComment(action) {
    try{
        const result = yield call(addCommentAPI,action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data
        });
    }catch(err){
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }     
}

// loadPosts
function loadPostsAPI (data) {
    return axios.get('/posts',data);
}

function* loadPosts(action) {
    try{
        const result = yield call(loadPostsAPI,action.data);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data
        });
    }catch(err){
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data
        })
    }     
}

function likePostAPI (data) {
    return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
    try{
        const result = yield call(likePostAPI,action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data
        });
    }catch(err){
        yield put({
            type: LIKE_POST_FAILURE,
            data: err.response.data
        })
    }     
}
function unlikePostAPI (data) {
    return axios.delete(`/posts/${data}/like`);
}

function* unlikePost(action) {
    try{
        const result = yield call(unlikePostAPI,action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data
        });
    }catch(err){
        yield put({
            type: UNLIKE_POST_FAILURE,
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
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadPosts() {
    yield throttle(2000,LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLikePost() {
    yield throttle(LIKE_POST_REQUEST, likePost);
}
function* watchUnLikePost() {
    yield throttle(UNLIKE_POST_REQUEST, unlikePost);
}
export default function* () {
    yield all([
        fork(watchLikePost),
        fork(watchUnLikePost),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPosts),
    ])
}