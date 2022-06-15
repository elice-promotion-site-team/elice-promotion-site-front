// import { useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import './App.css';
import mainBackground from '../src/assets/main_background.png';
import mainCategory1 from '../src/assets/main01-1.png';
import mainCategory2 from '../src/assets/main02-1.png';
import mainCategory3 from '../src/assets/main03-1.png';
import mainCategory4 from '../src/assets/main04-1.png';
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
    <div className="mainContainer">
      <img src={mainBackground} className="mainbg" />
      <img src={mainCategory1} className="mainct ct1" />
      <img src={mainCategory2} className="mainct ct2" />
      <img src={mainCategory3} className="mainct ct3" />
      <img src={mainCategory4} className="mainct ct4" />
      <TrackInfo />
    </div>
  );
}

export default App;
