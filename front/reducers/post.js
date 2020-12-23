export const initialState = {
    mainPosts: [{
        id:1,
        User:{
            id:1,
            nickname:'tnswh',
        },
        content: '첫 번째 게시글 #익스프레스 ',
        Images:[{
            src:'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726'
        },{
            src:'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg'
        },{
            src:'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg'
        }],
        Comments:[{
            User:{
                nickname:'nero',
            },
            content:'우와!!!',
        },{
            User:{
                nickname:'hero',
            },
            constent:'오오오오',
        }]
    }],
    imagePaths:[],
    addPostLoading:false,
    addPostDone: false,
    addPostError: null,
    
    addCommentLoading:false,
    addCommentDone: false,
    addCommentError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost= (data) = {
    type: ADD_POST_REQUEST,
    data,
}

export const addComment= (data) = {
    type: ADD_COMMENT_REQUEST,
    data,
}

const dummyPost =(data) => ({
    ids:2,
    content: data,
    User:{
        id:1,
        nickname:'tnswh',
    },
    Images:[],
    Comments:[],
});

const reducer = (state= initialState, action) => {
    switch (action.type){
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                //앞에다가 놔야지 최근에 포스트 쓴것이 처음에 나옴
                mainPosts:[dummyPost(action.data), ...state.mainPosts],
                addPostLoading: false,
                addPostDone : true,
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone : true,
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }

        default:
            return state;
    }
};

export default reducer;