//yarn add redux
//yarn add react-redux



/*
redux
전역 상태 관리 hook
리액트는 변경되는 값들을 보통 state로 지정해서 관리를 한다.
보통 관리해야 할 상태값이 적은 경우 state로 관리가 가능하지만 컴포넌트들 끼리의 공유할 상태값이 많거나 복잡하게
엉키게 되면 state로 관리하는 한계가 명확하게 드러난다.
props로 상태값을 관리하면 가독성이 떨어지며, 유지보수에 어려움이 생긴다.
불필요한 리랜더링이 지속적으로 발생하게 된다.

이러한 state의 단점을 보완해서 하나의 공간에 데이터를 모아두고 전역상태로 관리하는 hook
redux는 store라는 상태 저장소를 사용하먀, 이 store에서 관리되는 상태값은 일반적으로 꺼내오거나 변경은 불가능하다.
(상태값의 안정성)
store에서 저장된 상태는 자바스크립트의 객체로 표시되어 저장된다.

리덕스에서는 
action -> dispatch > reducer -> store순으로 데이터가 진행하게 된다.

action : 상태를 변경하려는 객체
dispatch : store에서 action 전달하기 위해서 제공하는 방법
변경될 내용이 전달되면 reducer이 코드를 처리하고 업데이트를 한다.
*/

import { combineReducers } from "redux";
import { FETCH_ACTION_MOVIES, FETCH_COMEDY_MOVIES } from ".."; // index는 경로에서 생략가능
// import ActionMovie from "./reducerActionMovie"

const actionMoviesReducer = (state = [], action)=>{
    switch (action.type){
        case FETCH_ACTION_MOVIES :
            return{
                ...state,
                movies : action.data
            };
        default:
            return state;
    }
};

const comedyMovieReducer = (state = [], action)=>{
    switch (action.type){
        case FETCH_COMEDY_MOVIES :
            return{
                ...state,
                movies : action.data
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    action : actionMoviesReducer,
    comedy : comedyMovieReducer
})
//여러개의 reducer를 하나의 store에서 실행할 수 있도록 해주는 메서드
//장르마다 불러올 reducer가 다르기 때문에 한번에 관리할 수 있는 combineReducers를 사용

export default rootReducer;