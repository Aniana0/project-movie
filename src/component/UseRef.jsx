import React, { useEffect, useRef, useState } from 'react';

function UseRef(props) {
    /*
    useref
    dom요소에 직접적으로 접근해서 참조하거나 값을 변경하기 위해서 사용하는 hook
    스크립트에서 사용하는 quselector, getelements**은 리액트에서 사용하지 말라고 하는 선택자
    리액트는 dom요소에 직접적으로 접근하는 것을 금지

    방법
    useref를 가져와서 값을 초기화 하고 시작
    current로 값이나 객체를 연결
    
    */

    //case 01. 객체에 직접적으로 접근해서 선택하는 방법
    // const ref = useRef()
    // console.log(ref)

    // useEffect(()=>{
    //     ref.current.focus();
    //     console.log(ref)
    // },[])

    //usestate로 상태값을 관리할때
    // const [val, setVal] = useState('');
    // const [num, setNum] = useState(0);

    // const countNum = ()=>{
    //     setVal(`${num}`);
    //     setNum(num + 1);
    // }

    //useref로 상태값 관리
    const [num, setNum] = useState(0);
    const ref = useRef('');

    const countNum = ()=>{
        ref.current = `${num}`;
        setNum(num + 1);
    }


    return (
        <div>
            {/* <input ref={ref} type='text'/> */}
            <button onClick ={countNum}>1 추가하기</button>
            <p>{ref.current}</p>
            
        </div>
    );
}

export default UseRef;