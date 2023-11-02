import React, { useEffect, useState } from 'react';

import axios from '../api/axios';
import request from '../api/request';

import {styled} from 'styled-components'

function MainVideo(props) {
    const [movie, setMovie] = useState(null); //영화가 있음을 반환
    const [videoKey, setVideoKey] = useState(null) // 영화동영상을 연결할 아이디를 반환
    const [showImg, setShowImg] = useState(true)//맨처음 이미지를 보여줄 이미지 상태값 
    //처음부터 보여지기 때문에 true로 설정

    useEffect(()=>{
        fetchData();
    },[])

    useEffect(()=>{
        if(videoKey && showImg){
            changeVideo()
        }
    },[videoKey, showImg])
    

    const fetchData = async ()=>{
        //async 비동기식으로 데이터에 접근하는 메서드

        try{
            const res = await axios.get(request.fetchNowPlayMovie);
            const movieId = res.data.results[
                Math.floor(Math.random()* res.data.results.length)
            ].id;

            const {data : movieDetail} = await axios.get(`movie/${movieId}`,{
                params : {append_to_response : 'videos'},
            })

            if(movieDetail.videos && movieDetail.videos.results.length > 0){
                
                setMovie(movieDetail)
                setVideoKey(movieDetail.videos.results[0].key)
                console.log(movieDetail.videos.results.length)
                console.log(movieDetail.videos.results[0].key)
                
                setTimeout(()=>{
                    setShowImg(false)
                },2000)
            }
        }catch (error){
            console.log(error);
        }
    }

    const changeVideo = () =>{
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML ='';

        const iframe = document.createElement('iframe');
        iframe.src=`https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&mute=1&loop=1&playlist=${videoKey}`;
        iframe.width = '100%';
        iframe.height = '100%';
        videoContainer.appendChild(iframe);
        
    }

    
    return (
        <>
            {showImg && movie &&(
                <MainVideoWrapper img={movie.backdrop_path}>
                    {/* <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} /> */}
                </MainVideoWrapper>
            )}
            <VideoWrapper id="videoContainer"></VideoWrapper>
        </>
    );
}

const MainVideoWrapper = styled.div`
    background: url(https://image.tmdb.org/t/p/original/${(props)=>props.img}) no-repeat center center / cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9;
`
const VideoWrapper = styled.div`
    width: 100vw;
    height: 100vh;

`

export default MainVideo;
