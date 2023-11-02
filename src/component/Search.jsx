import React, { useEffect, useRef, useState } from 'react';
import {BiSearch} from 'react-icons/bi';
import styled from 'styled-components';
import {MdClose} from 'react-icons/md';
import axios from 'axios';

function Search(props) {
    const [visible, setVisible] = useState(false);
    const [clearBtn, setClearBtn] = useState(false);
    const [text, setText] = useState('');

    const [list, setList] = useState(false);
    const [movieList, setMovieList] = useState([]);

    const searchFormRef = useRef()
    //useref : dom에 직접 접근하는 hook
    //current로 값을 전달

    let data; // 영화리스트를 받아올 배열

    const API_KEY = '8ff9a060b55b3149b598aa3a0fac89c8';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&sort_by=&include_adult=false&query=${text}&language=ko-KR&page=1`

    const toggleInputOpen = (e)=>{
        e.preventDefault();
        setVisible(true);
        /*
        리액트에서는 기본동작이 기본적으로 중지되지 않으므로 명시적으로 항상 
        e.preventDefault()를 추가해야 한다.
        */
    }
    const onClear = (e)=>{
        e.preventDefault();
        setText('');
        setClearBtn(false);
    }

    const fetch = async ()=>{
        const res = await axios.get(url);
        data = res.data.results || [];
        setMovieList(data);
    }

    useEffect(()=>{

        const onClose = (e) =>{
            if(searchFormRef.current && !searchFormRef.current.contains(e.target)){
                setText('');
                setClearBtn(false);
            }
        }
        document.addEventListener('click', onClose);
        return ()=>{
            document.removeEventListener('click', onClose)
        }
    },[])
    return (
        <>
            <SerachForm 
            visible={`${visible}`} 
            className={visible ? 'on' : null}
            ref={searchFormRef}
            >
                <button onClick={toggleInputOpen}>
                    <BiSearch className='search-btn'/>
                </button>
                {visible &&(
                    <input type='text'
                    placeholder='제목,사람,장르'
                    value={text}
                    onChange={(e)=>{
                        setClearBtn(e.target.value.trim() !== '')
                        //앞뒤의 공백을 모두 제거해서 빈문자열인지를 검사
                        setText(e.target.value);
                        setList(true);
                        fetch();
                    }}/>
                )}
                {clearBtn && (
                    <button className='close-btn' onClick={onClear}>
                        <MdClose/>
                    </button>
                )}
            </SerachForm>

            <ResultContainer className={(list ? 'on' : null)}>
                    <div className="searchList">
                        <p className="resultText">{text}로 검색한 결과입니다.</p>
                        {list ? (
                            <div className="listWrapper">
                                {movieList && movieList.map((movie)=>(
                                    <List props={movie} key={movie.id}/>
                                ))}
                            </div>
                        ) : (<p>리스트를 받아오지 못했습니다.</p>)}
                    </div>
            </ResultContainer>
        </>
    );
}

const List = (props) => {
    const {backdrop_path, title} = props.props;
    const imgURL = backdrop_path;

    return(
        <div className="listItem">
            <img src={`https://image.tmdb.org/t/p/original/${imgURL}`} alt={title}/>
        </div>
    )
}

export default Search;

const SerachForm = styled.form`

    display: flex;
    margin-left: auto;
    width: 30px;
    position: relative;
    .search-btn{
        font-size: 24px;
        color: #ffffff;
    }
    &.on{
        width : 300px;
        transition: 500ms;
        border: solid 1px #ffffff;
    }
    input{
        width: ${({visible})=>(visible ? '250px' : '0px')};
        color: #ffffff;
        outline: none;
    }
    .close-btn{
        color: #ffffff;
        font-size: 20px;
        display: flex;
        align-items: center;
        margin-left: auto;
        z-index: 999;
    }

`

const ResultContainer = styled.div`
    position : fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #333;
    display: none;
    z-index: -1;
    overflow-y: scroll;
    &.on{
        display: block;
    }
    .searchList{
        padding-top: 100px;
        width: 100;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        .resultText{
            color: #FFF;
            margin-bottom: 30px;
            font-size: 36px;
            text-align: center;
            font-weight: bold;
        }
        .listWrapper{
            width: 100%;
            height: 100%;
            display: flex;
            gap: 24px;
            justify-content: center;
            flex-wrap: wrap;
            .listItem{
                width: 350px;
                img{
                    width: 100%;
                }
            }
        }
    }
`