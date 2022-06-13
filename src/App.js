import logo from './logo.svg';
import './App.css';
// import { useEffect } from 'react';
// import axios from 'axios';

function App() {
  //backend src/server.js와 연결된 data를 가져옴
  // const sendRequest = async () => {
  //   const response = await axios.get(`http://localhost:3001`); //PORT 수정 필요
  //   console.log(response);
  //   console.log(response.data);
  // };

  // useEffect(() => {
  //   sendRequest();
  // });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
