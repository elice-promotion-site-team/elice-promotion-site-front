import React, {useState, useEffect} from 'react';
import Burger from './Burger';
import styled from 'styled-components';
import quizzes from '../assets/quizzes.json'
import { useCookies } from 'react-cookie';



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

  let userInfo = {"isSolved":true, "score":{score}, "corrected": {corrected}}

  //로그인
  const [cookies] = useCookies(['token']);
  if (!cookies.token) {
    alert('로그인 해주세요.');
    window.open('http://localhost:3000/auth/google', '_blank')
  };
  // console.log(cookies.token)

  
  const aa = async () => {
    let res1 = await fetch(`http://localhost:3000/auth/${cookies.token}`, {
      method: 'GET',
    })
    const tokenData = await res1.json();


    // 로그인한 유저 정보
    const resUserId = await fetch('http://localhost:3000/api/user/list', {
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
    const resQuiz = await fetch(`http://localhost:3000/api/user/${userId}/quiz`, {
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
    const resQuizzes = await fetch(`http://localhost:3000/api/quiz`, {
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
  
  var allScore = []
  async function whatIsBestScore() {
    // 최고점수 불러오기
    
    const resBestScore = await fetch(`http://localhost:3000/api/user/quiz/ranking`, {
      method: 'GET'
    })
    const bestScoreData = await resBestScore.json()
    bestScoreData.forEach(user => allScore.push(user.score))
  }
  whatIsBestScore()
  let scores = allScore.sort((a,b) => b-a)
  const bestScore = scores[0]
  // console.log(allScore)
  
  
  const checkAnswer = (num) => {
    if(number2 <= 3) { // arr.length
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

  if (number2 > 3) {
    document.querySelector('.popup').style.display = "block"
  }
  

  // if(number2 <= 3) { //arr.length
    return (
      <BackGround>
        <header>
          <Burger />
        </header>
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
                <p className='persentage'>정답률 : 100%</p>
              </LeftInfo>
              <BestScore>
                <p className='bestScore'>Best Score : <span>25</span> </p>
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
            <div className='normalPopup' style={{display:'none'}}>
              <p className='text1'>Well done!</p>
              <p className='text2' style={{marginTop:'10px'}}>Your score : {score}</p>
              <p className='text3'>점수 랭킹은 각 서비스 이용자들의 첫 문제풀이 점수로 반영됩니다.</p>
              <a href="">Play Again</a>
            </div>
            <div className='bestPopup'>
              <p className='text1'>Conglatulation!</p>
              <p className='text2'>Your score : {score}</p>
              <p className='text3' style={{color:'black', fontSize:'1.2rem'}}>최고 점수 달성!</p>
              <a href="">Play Again</a>
            </div>
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
  width:1000px;
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
  width:500px;
  height:300px;
  position:fixed;
  left:calc(50% - 250px);
  top:calc(50% - 150px);
  display:none;

  div {
    height:100%;
    background-color:white;
    border-radius:10px;
    box-shadow:0 0 20px rgba(0,0,0,.3);
    padding:30px;
    text-align:center;
    box-sizing:border-box;
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