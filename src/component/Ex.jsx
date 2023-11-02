import React, { useEffect, useState } from 'react';

function Ex(props) {

    /*
    useEffect의 실행 조건은 마운트, 언마운트, 업데이트 되었을때 실행
    페이지가 로딩되면 useEffect는 무조건 최초1회는 실행
    []를 사용하면 useEffect는 촤초 1회 실행으로 바꾸게 된다.
    [변수] 사용하면 [변수]의 값이 바뀔때에만 실행되도록 한다.
    
    */
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        console.log('11');
    },[num])



    return (
        <div>
            <p>{num}</p>
            <p>{count}</p>
            <button onClick={()=>setNum(num+1)}>+++</button>
            <button onClick={()=>setCount(count+1)}>+++</button>
        </div>
    );
}

export default Ex;