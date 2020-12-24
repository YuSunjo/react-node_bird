import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';
import shortid from 'shortid';

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

    removePostLoading:false,
    removePostDone: false,
    removePostError: null,
    
    addCommentLoading:false,
    addCommentDone: false,
    addCommentError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        id:shortid.generate(),
        User:{
            id: shortid.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.paragraph,
        Images:[{
            src: faker.image.image(),
        }],
        Comments: [{
            User: {
                id: shortid.generate(),
                nickname: faker.name.findName()
            },
            content: faker.lorem.sentence(),
        }],
    }))
)
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost= (data) = ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment= (data) = ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User:{
        id:1,
        nickname:'tnswh',
    },
    Images:[],
    Comments:[],
});

const dummyComment = (data) => ({
    id:shortId.generate(),
    content: data,
    User:{
        id:1,
        nickname:'tnswh',
    },
})

//immer state가 draft로 바뀐다. 그냥 쓰면 알아서 불변성 있게 해준다. 
const reducer = (state= initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type){
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading= false;
                draft.addPostError= action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading= true;
                draft.removePostDone= false;
                draft.removePostError= null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading= false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex]};
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone : true,
                // };
                const post = draft.mainPosts.fint((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }        
    });
};
export default reducer;