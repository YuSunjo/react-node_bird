export const initialState = {
    mainPosts: [{
        id:1,
        User:{
            id:1,
            nickname:'tnswh',
        },
        content: '첫 번째 게시글',
        Images:[{
            src:'C:\Users\tnswh\OneDrive\사진\Saved Pictures'
        },{
            src:'C:\Users\tnswh\OneDrive\사진\Saved Pictures'
        },{
            src:'C:\Users\tnswh\OneDrive\사진\Saved Pictures'
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
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,

}

const dummyPost ={
    ids:2,
    content: 'dummy data',
    User:{
        id:1,
        nickname:'tnswh',
    },
    Images:[],
    Comments:[],
};

const reducer = (state= initialState, action) => {
    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                //앞에다가 놔야지 최근에 포스트 쓴것이 처음에 나옴
                mainPosts:[dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        default:
            return state;
    }
};

export default reducer;