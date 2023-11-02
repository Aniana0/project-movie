import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchActionMovies} from "../store/index";
import styled from 'styled-components';
import Overview from './Overview';

// swiper 기본 임포트들 (필수!)
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// swiper 모듈
import { Navigation, Pagination } from 'swiper/modules' // Navigation = 도트리스트 / Pagination = 좌우버튼
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// js가 아닌 파일은 확장자를 넣어야 한다
import '../style/swiperCustom.css'

function Action() {
    const [isClick, setIsClick] = useState(false); // 클릭한 무비의 인덱스
    const [isSelect, setIsSelect] = useState({}); // 무비에 대한 정보

    const [zIndex, setZIndex] = useState(1);

    const dispatch = useDispatch()//생성된 action의 state 접근

    useEffect(()=>{
        dispatch(fetchActionMovies());
    },[])

    const actionData = useSelector((state)=>state.action.movies, []) || [];
    //useSelector //store의 상태값을 변경
    console.log(actionData.results);

    const overViewEvent = (movie, index) => {
        setIsClick(index);
        setIsSelect(movie);
        setZIndex(zIndex + 999);
    }

    const overViewClose = ()=>{
        setIsClick(null)
    }

    return (
        <div>
            <MovieContainer style={{zIndex : isClick !== null ? zIndex : 1}}>
                <MovieTitle>액션</MovieTitle>
                <Swiper
                    modules={[Navigation, Pagination]} // 모듈 불러오기
                    spaceBetween={20} // 슬라이드와 슬라이드 사이 여백 == gap
                    slidesPerView={6} // 한번에 보여질 슬라이드의 갯수
                    slidesPerGroup={6} // 슬라이드시 한번에 움직일 갯수
                    loop // 무한 반복
                    navigation // 모듈 적용
                    pagination={{clickable : true}} // 모듈 적용
                >
                    <div className='movieWrapper'>
                        {actionData.results && actionData.results.map((movie, index)=>(
                            <SwiperSlide>
                                <MovieItem
                                    onClick={()=>overViewEvent(movie, index)}
                                >
                                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
                                </MovieItem>
                                {isClick === index && (
                                    <Overview {...isSelect} setIsClick={overViewClose} movieId={movie.id} />
                                )}
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </MovieContainer>
        </div>
    )
}
const MovieContainer = styled.div`
    box-sizing: border-box;
    margin-bottom: 50px;
    transform: translateY(-100px);
    position: relative;
    .swiper-slide-active{
        .hoverItem{
            left: 250px;
        }
    }
`
const MovieTitle = styled.h2`
    font-size: 40px;
    font-weight: bold;
    color: #FFFFFF;
`
const MovieItem = styled.div`
    img{
        display: block;
        width: 100%;
    }
`
export default Action;