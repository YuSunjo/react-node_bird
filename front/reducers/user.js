export const initialState = {
    isLoggedIn: false,
    isLoggingIn: false,     //로그인 시도중 
    isLoggingOut: false,    //로그아웃 시도중 
    me: null,
    signUpdata: {},
    loginData: {},

}


export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}
export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}

const reducer = (state= initialState, action) => {
    switch (action.type){
        case 'LOG_IN_REQUEST': 
            console.log('reducer login')
            return {
                ...state,
                isLoggingIn: true,
            };
        case 'LOG_IN_SUCCESS':
            console.log('LOG_IN_SUCCESS')
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me:{ ...action.data, nickname:'sunjo'},
            };
        case 'LOG_IN_FAILURE':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            };
        case 'LOG_OUT_REQUEST':
            return {
                ...state,
                isLoggingOut: true,
            };
        case 'LOG_OUT_SUCCESS':
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null,
            };
        case 'LOG_OUT_FAILURE':
            return {
                ...state,
                isLoggingOut: false,
            };
        default:
            return state;
    }
};

export default reducer;