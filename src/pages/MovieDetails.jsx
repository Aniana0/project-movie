import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { styled } from 'styled-components'

export default function MovieDetails() {
  // 경로를 구성하는 url에서 값을 추출
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(
        `/movie/${movieId}`
        )
        setMovie(request.data)
    }
    fetchData();
  }, [movieId])
  return (
    <DetailWrap>
      <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
      <h2>{movie.title}</h2>
    </DetailWrap>
  )
}

const DetailWrap = styled.div`
width: 100%;
  img{
    width: 100%;
    object-fit: cover;
    display: block;
  }
`