export const initialState = {
    mainPosts: [{
        id:1,
        User:{
            id:1,
            nickname:'tnswh',
        },
        content: '첫 번째 게시글',
        Images:[{
            src:'https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2207573D58CFDE2704&imgrefurl=https%3A%2F%2Fjungjeok.tistory.com%2F137&tbnid=_nfOHvvh-YIzCM&vet=12ahUKEwjZ2OvoltztAhWMAJQKHW_PAkwQMygCegUIARDeAQ..i&docid=7AcBUaEcAJRN3M&w=800&h=400&q=%EB%9D%BC%EC%9D%B4%EC%96%B8&ved=2ahUKEwjZ2OvoltztAhWMAJQKHW_PAkwQMygCegUIARDeAQ'
        },{
            src:'https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2207573D58CFDE2704&imgrefurl=https%3A%2F%2Fjungjeok.tistory.com%2F137&tbnid=_nfOHvvh-YIzCM&vet=12ahUKEwjZ2OvoltztAhWMAJQKHW_PAkwQMygCegUIARDeAQ..i&docid=7AcBUaEcAJRN3M&w=800&h=400&q=%EB%9D%BC%EC%9D%B4%EC%96%B8&ved=2ahUKEwjZ2OvoltztAhWMAJQKHW_PAkwQMygCegUIARDeAQ'
        },{
            src:'https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2207573D58CFDE2704&imgrefurl=https%3A%2F%2Fjungjeok.tistory.com%2F137&tbnid=_nfOHvvh-YIzCM&vet=12ahUKEwjZ2OvoltztAhWMAJQKHW_PAkwQMygCegUIARDeAQ..i&docid=7AcBUaEcAJRN3M&w=800&h=400&q=%EB%9D%BC%EC%9D%B4%EC%96%B8&ved=2ahUKEwjZ2OvoltztAhWMAJQKHW_PAkwQMygCegUIARDeAQ'
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