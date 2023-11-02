import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Navigation(props) {
    return (
        <Nav>
            <ul className='gnb'>
                <li><Link to='/'>홈</Link></li>
                <li><Link to='/serise'>시리즈</Link></li>
                <li><Link to='/movie'>영화</Link></li>
                <li><Link to='/hotContent'>NEW! 요즘 대세 컨텐츠</Link></li>
                <li><Link to='/pickContent'>내가 찜한 리스트</Link></li>
                <li><Link to='/langContent'>언어별로 찾아보기</Link></li>
            </ul>

        </Nav>
    );
}

export default Navigation;

const Nav = styled.nav`
    .gnb{
        display: flex;
        gap: 20px;
        li{
            a{
                color: #ffffff;
                font-size: 12px;
            }
        }
        
    }
`