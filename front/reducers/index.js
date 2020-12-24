import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;


//action creator   => 이런식으로 type에 맞는 함수를 만들어줘서 할 수도 있다. 
// const changeNickname= (date) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data,
//     }
// }
//이런 객체를 위의 함수로 만들어저서 편하게 쓰면 된다. 
// const changeNickname= {
//     type: 'CHANGE_NICKNAME',
//     data: 'hello'
// }