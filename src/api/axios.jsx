import axios from 'axios';
/*
axios
node.js에서 백엔드와 통신하기 위해서 만들어진 http 비동기 통신 라이브러리
yarn add axios설치

*/

const API_KEY = '8ff9a060b55b3149b598aa3a0fac89c8'; //계정마다 발급받는 api키를 변수화
const BASE_URL = 'https://api.themoviedb.org/3'// 정보를 받아올 url의 공통 주소를 변수화

const instance = axios.create({
    baseURL : BASE_URL,
    params : {
        api_key : API_KEY,
        language : 'ko-KR'
    }
})

export default instance