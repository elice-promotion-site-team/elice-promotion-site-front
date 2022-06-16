// import { useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';

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
    <Routes>
      <Route
        path="/"
        element={
          <div className="mainContainer">
            <Nav title="Elice Promotion Site" />
            <img src={mainBackground} className="mainbg" alt="" />
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
            </a>
          </div>
        }
      ></Route>
      <Route path="/trackinfo" element={<TrackInfo />} />
    </Routes>
  );
}

export default App;
