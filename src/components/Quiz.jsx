import React, {useState, useEffect} from 'react';
import Burger from './Burger';
import styled from 'styled-components';
import quizzes from '../assets/quizzes.json'
import { useCookies } from 'react-cookie';
import Header from './Header';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 새 퀴즈 등록
async function del(){
  // const resNewQuiz = await fetch(`/api/quiz`, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     "quizNumber": 21,
  //     "quizName": "퀴즈 이름",
  //     "question": "다음 중 Git에 대해 틀린 것을 고르세요.",
  //     "example": ["Git은 여러 명이 효율적으로 협업하기 위한 툴이다.","Git은 오픈소스이므로 누구나 사용할 수 있다.","Git은 작업을 할 때 자동으로 옛 버전의 파일을 지워주기 때문에 용량을 아낄 수 있다.","Git을 사용하면 여러 버전을 동시에 관리할 수 있어 데이터의 안정성을 보장된다."],
  //     "answer": 3,
  //     "level": "easy"
  //   },
  //   {
  //     "quizNumber": 22,
  //     "quizName": "퀴즈 이름",
  //     "question": "변경된 내용을 원격저장소에 업데이트 해볼까요? 저장소에 정보를 올리는 git명령어 중 옳은것을 골라주세요.",
  //     "example": ["git push","git push origin master","git push --all", "git push https://gitlab.com/group/project"],
  //     "answer": 2,
  //     "level": "easy"
  //   },
  //   {
  //     "quizNumber": 23,
  //     "quizName": "퀴즈 이름",
  //     "question": "this가 가리키는 것에 대한 설명으로 옳지 않은 것을 고르세요.",
  //     "example": ["함수의 호출 환경에 따라 함수 내 this가 가리키는 것이 결정된다.","bind, apply, call 메서드는 함수의 this를 바꿀 수 있다.","setTimeout은 함수의 this를 바꿀 수 없다.", "콜백 함수는 다른 함수의 인자로 보내지는 함수이다."],
  //     "answer": 3,
  //     "level": "normal"
  //   },
  //   {
  //     "quizNumber": 24,
  //     "quizName": "퀴즈 이름",
  //     "question": "HTTP, REST API에 관한 설명으로 옳지 않은 것을 고르세요.",
  //     "example": ["HTTP는 서버와 클라이언트 간 통신 방법을 정한 규약이다.","HTTP 요청 메서드는 요청에 대한 동작을 정의한다.","HTTP 응답 메시지에 헤더 정보가 포함되지 않는다.", "HTTP Status는 요청의 결과를 코드로 나타낸다."],
  //     "answer": 3,
  //     "level": "normal"
  //   },
  //   {
  //     "quizNumber": 25,
  //     "quizName": "퀴즈 이름",
  //     "question": "다음 중 MongoDB의 개념에 대한 설명으로 올바르지 않은 것은?",
  //     "example": ["Database는 Collection이 저장되는 저장소이다.","Collection은 Document가 저장되는 공간이다.","Document는 MongoDB에 저장되는 데이터이다.", "ObjectID는 하나씩 숫자가 증가하는 primary key이다."],
  //     "answer": 4,
  //     "level": "hard"
  //   }
  // )
  // })
  // const newQuizData = await resNewQuiz.json()

  // 예제 문제 삭제
  // const resDelQuiz = await fetch(`/api/quiz/25`,{
  //   method: 'DELETE',
  // })
  // const DelQuizData = await resDelQuiz.json()
}
del()

let arr = []
let quizzesInfo = []

const datas = quizzes.data.map((data) => {
  return data
})

for(let i=0; i<datas.length; i++){
  let randomNum = Math.floor(Math.random()*Number(datas.length))
  if(arr.indexOf(randomNum) === -1) arr.push(randomNum)
  else i--
}
arr.push(0)



const Quiz = () => {
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(1);
  const [progressNum, setProgressNum] = useState(100/datas.length)
  const [score, setScore] = useState(0)
  const [corrected, setCorrected] = useState(0)
  const [bestScore , setBestScore] = useState(0)
  const [percentage , setPercentage] = useState(0)
  const [arr3, setArr3] = useState(0)
  // const [datas, setDatas] = useState('')

  // const [allQuizQuestion , setAllQuizQuestion] = useState('')
  // const [allQuizEx , setAllQuizEx] = useState([])
  // const [allQuizNum , setAllQuizNum] = useState([])
  // const [allQuizAnswer , setAllQuizAnswer] = useState([])
  // const [allQuizLevel , setAllQuizLevel] = useState([])

  // let userInfo = {"isSolved":true, "score":{score}, "corrected": {corrected}}
  // let arr2 = []
  // async function allQuizzes() {
  
  //   const resAllQuizzes = await fetch(`/api/quiz/quizzes`, {
  //     method: 'GET'
  //   })
  //   const allQuizzesData = await resAllQuizzes.json()
  //   const datas2 = allQuizzesData.map(data => {
  //     return data
  //   })
  //   // console.log(datas2.length)
    
  //   for(let i=0; i<datas2.length; i++){
  //     let randomNum2 = Math.floor(Math.random()*Number(datas2.length))
  //     if(arr2.indexOf(randomNum2) === -1) arr2.push(randomNum2)
  //     else i--
  //   }
  //   arr2.push(0)
  //   console.log(arr2)
  
  // }
  // allQuizzes()


  
  // 최고점수 불러오기
  var allScore = []
  async function whatIsBestScore() {
    const resBestScore = await fetch(`/api/user/quiz/ranking`, {
      method: 'GET'
    })
    const bestScoreData = await resBestScore.json()
    bestScoreData.forEach(user => allScore.push(user.score))
    const scores = allScore.sort((a,b) => b-a)
    setBestScore(scores[0])

    
  }
  whatIsBestScore()
  

  //로그인
  const [cookies] = useCookies(['token']);
  if (!cookies.token) {
    // alert('로그인 해주세요.')
    window.location.href = '/auth/google'
  };
  // console.log(cookies.token)

  const checkAnswer = (num) => {
    if(number2 <= arr.length) { // arr.length
      setTimeout(() => {
        setNumber(number + 1)
        setNumber2(number2 + 1)
        setProgressNum(progressNum + (100/datas.length))
      },1000)
    }

    function ifSolved(){
      setCorrected(corrected + 1);
      document.querySelector(`.question${num}`).style.backgroundColor = "green"
      document.querySelectorAll(`.question`).forEach(e => e.disabled = true)
      quizzesInfo.push({"quizNumber" : datas[arr[number]].quizNumber, "result": true})
      setTimeout(() => {
        document.querySelector(`.question${num}`).style.backgroundColor = "white"
        document.querySelectorAll(`.question`).forEach(e => e.disabled = false)
      },1000)
    }

    if(num === datas[arr[number]].answer && datas[arr[number]].level === "easy" && number2 <= 3) {
      setScore(score + 3);
      ifSolved()
    }
    else if (num === datas[arr[number]].answer && datas[arr[number]].level === "normal" && number2 <= 3){
      setScore(score + 4);
      ifSolved()
    }
    else if (num === datas[arr[number]].answer && datas[arr[number]].level === "hard" && number2 <= 3){
      setScore(score + 6);
      ifSolved()
    }
    else {
      document.querySelector(`.question${num}`).style.backgroundColor = "red"
      document.querySelectorAll(`.question`).forEach(e => e.disabled = true)
      quizzesInfo.push({"quizNumber" : datas[arr[number]].quizNumber, "result": false})
      setTimeout(() => {
        document.querySelector(`.question${num}`).style.backgroundColor = "white"
        document.querySelectorAll(`.question`).forEach(e => e.disabled = false)
      },1000)
    }
  } // num

  
  const aa = async () => {
    let res1 = await fetch(`/auth/${cookies.token}`, {
      method: 'GET',
    })
    const tokenData = await res1.json();


    // 로그인한 유저 정보
    const resUserId = await fetch('/api/user/list', {
      method : 'GET',
    })
    let userId = ''
    const userData = await resUserId.json();
    userData.forEach(user => {
      if(user.name === tokenData.name) userId = user._id
    })
      // .then(res => res.json())
      // .then(datas => datas.forEach(data => data._id))


    // 로그인한 유저 퀴즈 정보 업데이트
    const resQuiz = await fetch(`/api/user/${userId}/quiz`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "isSolved" : true, 
        "score" : score, 
        "corrected" : corrected
      }),
    })
    const quizData = await resQuiz.json()

    // 각 퀴즈 정/오답 정보 업데이트
    const resQuizzes = await fetch(`/api/quiz`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "update" : quizzesInfo
      })
    })
    const quizzezData = await resQuizzes.json()
  } //aa()
  
  async function bb() {
    //정답률
    const resPerentage = await fetch(`/api/quiz/quizzes`, {
      method: 'GET'
    })
    const percentageData = await resPerentage.json()
    // percentageData.forEach(each => {
    //   let eachPer = (Math.round(((each.corrected)/(each.solved))*100)) / 100
    //   console.log(datas[arr[number]].quizNumber)
    //   console.log(each.quizNumber)
    //   if(each.quizNumber === datas[arr[number]].quizNumber){
    //     console.log(Number(each.corrected))
    //   }
    // })
    
    for(let i=0; i<percentageData.length; i++){
      let eachPer = (Math.round(((percentageData[i].corrected)/(percentageData[i].solved))*100))
      if(percentageData[i].quizNumber === datas[arr[number]].quizNumber && eachPer !== NaN){
        setPercentage(eachPer)
      }
      else if(percentageData[i].quizNumber === datas[arr[number]].quizNumber && eachPer === NaN){
        setPercentage(0)
      }
    }
  }
  bb()

  if (number2 > 25 && bestScore <= score) {
    document.querySelector('.popup').style.display = "block"
    document.querySelector('.bestPopup').style.display = "block"
  }
  else if (number2 > 25 && bestScore > score) {
    document.querySelector('.popup').style.display = "block"
    document.querySelector('.normalPopup').style.display = "block"
  }
  

  // if(number2 <= 3) { //arr.length
    return (
      <BackGround>
        <Header></Header>
        <Main>
          <Section>
            <Left>
              <ProgressBar>
                <p>Question {number2}/{datas.length}</p>
                <progress max="100" value={progressNum}></progress>
              </ProgressBar>
              <QuestionArea dangerouslySetInnerHTML={ {__html: datas[arr[number]].question} } ></QuestionArea>
              <LeftInfo>
                <p className='level'>Level : {datas[arr[number]].level}</p>
                <p className='persentage'>정답률 : {percentage}%</p>
              </LeftInfo>
              <BestScore>
                <p className='bestScore'>Best Score : <span>{bestScore}</span> </p>
                <p className='yourScore'>Your Score : <span>{score}</span> </p>
              </BestScore>
            </Left>
            
            <Right>
              <div className='questions'>
                <Example className='question question1' onClick={() => checkAnswer(1)}>
                  <span className='num'>1</span>
                  <span className='ex'>{datas[arr[number]].example[0]}</span>
                </Example>
                <Example className='question question2' onClick={() => checkAnswer(2)}>
                  <span className='num'>2</span>
                  <span className='ex'>{datas[arr[number]].example[1]}</span>
                </Example>
                <Example className='question question3' onClick={() => checkAnswer(3)}>
                  <span className='num'>3</span>
                  <span className='ex'>{datas[arr[number]].example[2]}</span>
                </Example>
                <Example className='question question4' onClick={() => checkAnswer(4)}>
                  <span className='num'>4</span>
                  <span className='ex'>{datas[arr[number]].example[3]}</span>
                </Example>
              </div>
              {/* <button onClick={nextNumber}>클릭</button> */}
            </Right>
          </Section>
          <Popup className='popup'>
            <NormalPopup className='normalPopup'>
              <p className='text1'>Well done!</p>
              <p className='text2' style={{marginTop:'10px'}}>Your score : {score}</p>
              <p className='text3'>점수 랭킹은 각 서비스 이용자들의 첫 문제풀이 점수로 반영됩니다.</p>
              <a href="">Play Again</a>
            </NormalPopup>
            <BestPopup className='bestPopup'>
              <p className='text1'>Conglatulation!</p>
              <p className='text2'>Your score : {score}</p>
              <p className='text3' style={{color:'black', fontSize:'1.2rem'}}>최고 점수 달성!</p>
              <a href="">Play Again</a>
            </BestPopup>
          </Popup>
        </Main>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </BackGround>
    )
  // }
  // else {
    
  //   aa();

  //   // const res1 = Api.patch('/api/quiz', quizzesInfo);
  //   // const res = await Api.patch('/api/quiz', quizzesInfo);
  //   return (
  //     `your score: ${score}
  //     well done!
  //     `
  //   )
  // }
  
}

export default Quiz



const Main = styled.div`
  // width:1000px;
  margin:0 auto;
  display:flex;
  height:100%;
  align-items:center;
  z-index:1;
  position:relative;

  @media screen and (max-width:1000px){
    width:100%;
  }
  @media screen and (max-width:800px){
    height:auto;
  }
`

const Section = styled.section`
  margin:90px auto;
  width:1000px;
  height:80%;
  background-color:white;
  padding:30px;
  box-sizing:border-box;
  border-radius:10px;

  @media screen and (max-width:1000px){
    margin:90px 5%;
    width:100%;
  }
  @media screen and (max-width:800px){
    height:auto;
  }
`
const Left = styled.div`
  width:50%;
  float:left;
  padding-right:50px;
  box-sizing:border-box;
  border-right:1px solid #ddd;
  min-height:100%;

  &::after{
    content:'';
    display:block;
    clear:both;
  }

  @media screen and (max-width:800px){
    width:100%;
    padding-right:0;
    padding-bottom:30px;
    border-right:0;
    border-bottom:1px solid #ddd;
  }
`
const ProgressBar = styled.div`
  
  p {
    margin:0 0 10px 0;
  }

  progress {
    height:20px;
    border-radius:0;
  }
  progress::-webkit-progress-bar {
    background-color:#ddd;
  }
  progress::-webkit-progress-value {
    background-color:#4e54c8;
  }

`
const BestScore = styled.div`
  text-align:center;
  // background-color:#eee;
  box-sizing:border-box;
  box-shadow:0 0 5px rgba(0,0,0,.2);
  border-radius:5px;
  overflow:hidden;

  p {
    margin:0;
    width:50%;
    text-align:center;
    display:inline-block;
    height:40px;
    line-height:40px;
  }
  &::after {
    clear:both;
    content:'';
    display:block;
  }
  .bestScore {
    background-color:#4e54c8;
    color:white;
  }
  .bestScore span {
    font-size:1.2rem;
    font-weight:600;
  }
  .yourScore {
  }
  
  .yourScore span {
    // display:block;
    color:#4e54c8;
    font-size:1.2rem;
    font-weight:600;
  }
  
`
const Right = styled.div `
  float:right;
  width:50%;
  padding-left:50px;
  box-sizing:border-box;

  @media screen and (max-width:800px){
    width:100%;
    padding-left:0;
    padding-top:30px;
  }

  p {
    margin:0 0 30px 0;
  }
`
const LeftInfo = styled.div`
  margin:20px 0;
  background-color:#eee;
  padding:10px;
  border-radius:5px;
  box-sizing:border-box;

  p {
    margin:0;
    line-height:1.2rem;
  }
  &::after{
    content:'';
    display:block;
    clear:both;
  }
  .level {
    padding-right:10px;
    position:relative;
    display:inline-block;
  }
  .level::after {
    content:"";
    display:block;
    width:1px;
    height:12px;
    background-color:#999;
    position:absolute;
    right:0;
    top:4px;
  }
  .persentage {
    margin-left:10px;
    display:inline-block;
  }
`

const QuestionArea = styled.p`
  font-size:1.1rem;
  font-weight:600;
  
  code {
    background-color:rgba(0,0,0,.8);
    color:white;
    padding:20px;
    box-sizing:border-box;
    display:block;
    font-size:1rem;
    font-weight:300;
    margin-top:10px;
    border-radius:5px;
  }
`
const Example = styled.button`
  cursor:pointer;
  background-color:white;
  line-height:1.2rem;
  display:block;
  width:100%;
  min-height:50px;
  outline:0;
  border:0;
  padding:0;
  border-radius:5px;
  box-shadow:0 0 5px rgba(0,0,0,.3);
  margin-bottom:10px;
  box-sizing:border-box;
  // overflow:hidden;
  position:relative;

  &:hover {
    box-shadow:0 0 10px #4e54c8;
  }
  &:disabled {
    pointer-events: none;
  }
  .num {
    background-color: #4e54c8;
    color:white;
    display:inline-block;
    width:30px;
    text-align:center;
    height:30px;
    line-height:30px;
    border-radius:100%;
    position:absolute;
    left:-15px;
    top:calc(50% - 15px);
  }
  .ex {
    display:inline-block;
    width:100%;
    padding:5px 15px 5px 30px;
    box-sizing:border-box;
    margin:10px 0;
    vertical-align:middle;
    text-align:left;
  }
`
const Popup = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.3);
  display:none;

  div {
    width:500px;
    height:300px;
    position:fixed;
    left:calc(50% - 250px);
    top:calc(50% - 150px);
    background-color:white;
    border-radius:10px;
    box-shadow:0 0 20px rgba(0,0,0,.3);
    padding:30px;
    text-align:center;
    box-sizing:border-box;
    display:none;
  }
  p {
    margin:0;
  }
  .text1 {
    font-size:3rem;
    color:#4e54c8;
    font-weight:bold;
  }
  .text2{
    font-size:1.5rem;
    font-weight:bold;
    margin-top:20px;
  }
  .text3 {
    font-size:1.1rem;
    color:#777;
    word-break:keep-all;
    margin-top:20px;
  }
  a {
    display:inline-block;
    line-height:40px;
    width:150px;
    border-radius:20px;
    background-color:#4e54c8;
    color:white;
    text-decoration: none;
    position:absolute;
    left:calc(50% - 75px);
    bottom:30px;
    transition:.2s;
  }
  a:hover {
    background-color: #e0c3fc;
    background-image: linear-gradient(147deg, #e0c3fc 0%, #8ec5fc 74%);
  }
`
const NormalPopup = styled.div`

`
const BestPopup = styled.div`

`




const BackGround = styled.div`
  position:relative;
  top:0;
  left:0;
  background-color: #e0c3fc;
  background-image: linear-gradient(147deg, #e0c3fc 0%, #8ec5fc 74%);
  width: 100%;
  height:100vh;
  overflow:hidden;

  @media screen and (max-width:800px){
    height:auto;
    min-height:100vh
  }

  .circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .circles li{
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      animation: animate 25s linear infinite;
      bottom: -150px;
      
  }

  .circles li:nth-child(1){
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
  }


  .circles li:nth-child(2){
      left: 10%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
  }

  .circles li:nth-child(3){
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
  }

  .circles li:nth-child(4){
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
  }

  .circles li:nth-child(5){
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
  }

  .circles li:nth-child(6){
      left: 75%;
      width: 110px;
      height: 110px;
      animation-delay: 3s;
  }

  .circles li:nth-child(7){
      left: 35%;
      width: 150px;
      height: 150px;
      animation-delay: 7s;
  }

  .circles li:nth-child(8){
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
  }

  .circles li:nth-child(9){
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
  }

  .circles li:nth-child(10){
      left: 85%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 11s;
  }



  @keyframes animate {

      0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
      }

      100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
      }

  }
`