import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';
import '../css/Chat.css';

const socket = io.connect('http://localhost:3001', { autoConnect: true, transports: ['websocket'] });

const Chat = () => {
  const [cookies] = useCookies(['token']);
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: '', msg: '' });
  const [name, setName] = useState('');
  const messageRef = useRef('');

  useEffect(() => {
    getUser();
    getData();

    socket.on('chat message', (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌

    socket.on('update', (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    });
  }, []);

  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatArr]);

  const getUser = () => {
    //console.log('user_name : ' + cookies.user_name);
    const user_name = cookies.user_name;

    socket.on('connect', () => {
      //console.log('connect : ' + user_name);
      socket.emit('newUser', user_name);
    });

    setName(cookies.user_name);
  };
  const getData = async () => {
    const rawChatInfo = await fetch(`api/chat`);
    const chatInfo = await rawChatInfo.json();
    setChatArr(chatInfo);
  };

  const buttonHandler = () => {
    //버튼을 클릭했을 때 chat message이벤트 발생
    if (messageRef.current.value) {
      socket.emit('chat message', { name: chat.name, msg: chat.msg });
      messageRef.current.value = '';
    }
  };

  const changeMessage = (e) => {
    setChat({ name, msg: e.target.value });
  };

  const enterKeyHandler = () => {
    if (window.event.keyCode === 13) {
      buttonHandler();
    }
  };

  return (
    <div className="App">
      <ul id="messages">
        {chatArr.map((chatmsg, index) => (
          <li key={index}>
            {chatmsg.msg} {chatmsg.time}
          </li>
        ))}
      </ul>
      <div id="form">
        <input
          type="text"
          id="input"
          ref={messageRef}
          placeholder="내용"
          onChange={changeMessage}
          onKeyUp={enterKeyHandler}
        ></input>
        <button onClick={buttonHandler}>등록</button>
      </div>
    </div>
  );
};

export default Chat;
