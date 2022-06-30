// import { useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

import mainBackground from '../src/assets/main_background.png';
import mainCategory1 from '../src/assets/main01-1.png';
import mainCategory2 from '../src/assets/main02-1.png';
import mainCategory3 from '../src/assets/main03-1.png';
import mainCategory4 from '../src/assets/main04-1.png';
import mainCategory01 from '../src/assets/main01-2.png';
import mainCategory02 from '../src/assets/main02-2.png';
import mainCategory03 from '../src/assets/main03-2.png';
import mainCategory04 from '../src/assets/main04-2.png';
import TrackInfo from './components/TrackInfo';
import TrackApply from './components/TrackApply';
import GuestBook from './components/GuestBook';
import Quiz from './components/Quiz';

function App() {
  //backend src/server.js와 연결된 data를 가져옴
  // const sendRequest = async () => {
  //   const response = await axios.get(`http://localhost:3001`); //domain 수정 필요
  //   console.log(response);
  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   sendRequest();
  // });
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="mainContainer">
              <Header></Header>
              <section className="main main1">
                <span className="cateTitle">트랙소개</span>
                <a href="/trackinfo" className="cateLink">
                  <img src={mainCategory1} className="mainct" alt="트랙소개" />
                  <img src={mainCategory01} className="mainct hoverImg" alt="트랙소개" />
                </a>
              </section>
              <section className="main main2">
                <span className="cateTitle">신청방법</span>
                <a href="/trackapply" className="cateLink">
                  <img src={mainCategory2} className="mainct" alt="신청방법" />
                  <img src={mainCategory02} className="mainct hoverImg" alt="신청방법" />
                </a>
              </section>
              <section className="main main3">
                <span className="cateTitle">이벤트</span>
                <a href="/Quiz" className="cateLink">
                  <img src={mainCategory3} className="mainct" alt="이벤트" />
                  <img src={mainCategory03} className="mainct hoverImg" alt="이벤트" />
                </a>
              </section>
              <section className="main main4">
                <span className="cateTitle">방명록</span>
                <a href="/guestbook" className="cateLink">
                  <img src={mainCategory4} className="mainct" alt="방명록" />
                  <img src={mainCategory04} className="mainct hoverImg" alt="방명록" />
                </a>
              </section>
              {/* <img src={mainBackground} className="mainbg" alt="" />
              <a href="/trackinfo" className="cateLink">
                <img src={mainCategory1} className="mainct ct1" alt="트랙소개" />
                <img src={mainCategory01} className="mainct ct1 hoverImg" alt="트랙소개" />
                <span className="cateTitle">트랙설명</span>
              </a>
              <a href="" className="cateLink">
                <img src={mainCategory2} className="mainct ct2" alt="" />
                <img src={mainCategory02} className="mainct ct2 hoverImg" alt="" />
                <span className="cateTitle">신청방법</span>
              </a>
              <a href="" className="cateLink">
                <img src={mainCategory3} className="mainct ct3" alt="" />
                <img src={mainCategory03} className="mainct ct3 hoverImg" alt="" />
                <span className="cateTitle">이벤트</span>
              </a>
              <a href="" className="cateLink">
                <img src={mainCategory4} className="mainct ct4" alt="" />
                <img src={mainCategory04} className="mainct ct4 hoverImg" alt="" />
                <span className="cateTitle">방명록</span>
              </a> */}
            </div>
          }
        ></Route>
        <Route path="/trackinfo" element={<TrackInfo />} />
        <Route path="/trackapply" element={<TrackApply />} />
        <Route path="/guestbook" element={<GuestBook />} />
        <Route path="/Quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;

window.onload = function () {
  const elm = document.querySelectorAll('.main');
  const elmCount = elm.length;
  elm.forEach(function (item, index) {
    item.addEventListener('mousewheel', function (event) {
      event.preventDefault();
      let delta = 0;

      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;

      let moveTop = window.scrollY;
      let elmSelector = elm[index];

      // wheel down : move to next section
      if (delta < 0) {
        if (elmSelector !== elmCount - 1) {
          try {
            moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }

      // wheel up : move to previous section
      else {
        if (elmSelector !== 0) {
          try {
            moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }

      const body = document.querySelector('html');
      window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
    });
  });
};
