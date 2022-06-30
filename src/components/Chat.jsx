import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';
io({ transports: ['polling', 'websocket'] });
const socket = io.connect('http://localhost:3001', {
  cors: { origin: '*' },
});

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
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  },[chatArr])

  const getUser = async () => {
    if (!cookies.token) {
      alert('로그인이 필요한 페이지입니다.');
      window.location.href = '/auth/google';
    }
    const res = await fetch(`auth/${cookies.token}`);
    const data = await res.json();
    const name = data.name;
    console.log(name);
    setName(name);

    socket.on('connect', () => {
      socket.emit('newUser', name);
    });
  };
  const getData = async () => {
    const rawChatInfo = await fetch(`api/chat`);
    const chatInfo = await rawChatInfo.json();
    console.log(chatInfo);
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

  return (
    <div className="App">
      <div className="Box">
        <div className="ChatBox">
          {chatArr.map((chatmsg, index) => (
            <div className="Chat" key={index}>
              <div>{chatmsg.name}</div>
              <div className="ChatLog">{chatmsg.msg}</div>
              <div className="ChatLog">{chatmsg.time}</div>
            </div>
          ))}
        </div>
        <div className="InputBox">
          <input ref={messageRef} placeholder="내용" onChange={changeMessage}></input>
          <button onClick={buttonHandler}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
