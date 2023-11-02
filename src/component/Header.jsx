import React, { useEffect, useState } from 'react';
import {styled} from 'styled-components';
import {Link} from 'react-router-dom';
import {RiNetflixFill} from 'react-icons/ri'
import Navigation from './Navigation';
import Search from './Search';

function Header(props) {

    const [show, setShow] = useState(false);

    useEffect(()=>{

        const scrollEvent = ()=>{
            if(window.scrollY > 100 && !show){

                setShow(true);

            }else if(window.scrollY <= 100 && show){

                setShow(false);

            }
            // console.log(window.scrollY, show)
        }
        window.addEventListener('scroll', scrollEvent);

        return () =>{
            window.removeEventListener('scroll', scrollEvent)
        }
    },[show])
    //[]을 넣는 이유는 useeffect 효과가 마운트 될때 한번만 실행되도록 하도록 하는 설정
    /*
    조건을 만족해도 setShow값이 false를 계속 출력하는 이유
    현재 조건은 스크롤을 할때마다 useeffect계속 마운트가 되는 조건

    []대신에 [show]를 넣는 이유는 값을 한번만 변경해야 하기 때문에 show를 명시적으로 넣음
    */

    
    

    return (
        <HeaderContainer className={`${show && 'on'}`}>
            <Link to='/'>
                <h1 className='logo'><RiNetflixFill/></h1>
            </Link>
            <Navigation/>
            <Search/>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100vw;
    padding: 20px 30px;
    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
    align-items: center;
    z-index: 9999;
    gap: 30px;
    transition: 300ms;
    box-sizing: border-box;
    &.on{
        background: #333333;
    }
    .logo{
        color: red;
        font-size: 24px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
    }
`