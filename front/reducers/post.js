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