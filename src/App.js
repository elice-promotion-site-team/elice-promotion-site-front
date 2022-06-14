import logo from './logo.svg';
//import './App.css';
import TrackInfo from './components/TrackInfo';
// import { useEffect } from 'react';
// import axios from 'axios';

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
    <div className="App">
      <TrackInfo />
    </div>
  );
}

export default App;
