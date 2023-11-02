import logo from './logo.svg';
import './App.css';
import GlobalStyle from './style/GlobalStyle';
import Header from './component/Header';
import Ex from './component/Ex'
import UseRef from './component/UseRef'
import UseRef02 from './component/UseRef02';
import MainVideo from './component/MainVideo';
import MovieList from './component/MovieList';
import { Provider } from 'react-redux';

import  rootReducer  from "./store/reducer"
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import Search from './component/Search';

//reducer는 객체 형태만 가져올수 있으며, 함수형태는 가져올 수 없다.
//함수 형태의 reducer를 가져올때에는 thunk를 사용한다. 
//yarn add redux-thunk
//yarn remove react-thunk


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

function App() {
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <MainVideo/>
      <Provider store={store}>
        <MovieList/>
      </Provider>
      
      <Routes>
        <Route path='/movie/:movieId' element={<MovieDetails/>} />
      </Routes>
    </>
  );
}

export default App;
