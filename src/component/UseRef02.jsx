import React, { useEffect, useRef, useState } from 'react' 
import img from '../game.png'
 /*
    가위 바위 보 게임 만들기
    조건은 내 점수와 pc의 점수를 비교해서 0점은 비기기, 1점이 된 상대는 승리, -1점이 된 상대는 패배되는 조건
    예시 조건 
    플레이어 가위 : 컴퓨터 보
    1 : -1 => 1 - (-1) = 2

    플레이어 바위 : 컴퓨터 가위
    0  : 1 => 0 - 1 = -1

    플레이어 보 : 컴퓨터 바위
    -1 : 0 => -1 - 0 = -1

    

    플레이어 보 : 컴퓨터 가위
    -1 : 1 => -1 - 1 = -2

    플레이어 가위 : 컴퓨터 바위
    1 : 0 => 1 - 0 = 1

    플레이어 바위 : 컴퓨터 보
    0 : -1 => 0 - (-1) = 1


*/

export default function UseRef02() {

    const settings = {
        가위 : 1,
        바위 : 0,
        보 : -1
    }
    const handPosition = {
        바위 : '-50px',
        가위 : '-450px',
        보 : '-800px'
    }
    

    const [result, setResult] = useState('');// 결과값 (승리, 패배, 비기기)
    const [score, setScore] = useState(0) //기본 점수
    const interval = useRef()// setinterval의 관리
    const [imgPo, setImgPo] = useState(handPosition.바위)//handPosition에서 기본 위치 설정
    


    useEffect(()=>{
      interval.current = setInterval(changeHand, 100);
        console.log(interval)
        return ()=>{
            clearInterval(interval.current)
        }
    },[imgPo])

    const changeHand = ()=>{
        if(imgPo === handPosition.바위){
            setImgPo(handPosition.가위)
        }else if(imgPo === handPosition.가위){
            setImgPo(handPosition.보);
        }else if(imgPo === handPosition.보){
            setImgPo(handPosition.바위);
        }
    }


    const onClickBtn=(choice)=>()=>{
        clearInterval(interval.current)

        const myScore = settings[choice]
        const comScore = settings[getPcChoice(imgPo)]
       // console.log(myScore)
        //console.log(comScore)
        const diff = myScore - comScore;
        //console.log(diff)

        if(diff === 0){
            setResult('비겼습니다')
        }else if([-1,2].includes(diff)){
            //.includes = 해당하는 문자열을 확인
            setResult('이겼습니다');
            setScore((prev) =>  prev +1)
        }else{
            setResult('졌습니다');
            setScore((prev)=> prev -1);
        }

        setTimeout(()=>{
            interval.current = setInterval(changeHand,100);
        },3000)



    }
    const getPcChoice = (imgPo)=>{
        return Object.keys(handPosition).find((key)=> handPosition[key] === imgPo)
    }

   
    return (
        <div>
            <div className='hand' style={{width : '400px', height:'560px', background: `url(${img}) ${imgPo} 0`}}>

            </div>

            <div>
                <button onClick={onClickBtn('가위')}>가위</button>
                <button onClick={onClickBtn('바위')}>바위</button>
                <button onClick={onClickBtn('보')}>보</button>
            </div>
            <p>{result}</p>
            <p>승리 : {score}</p>
        </div>
    )
}

