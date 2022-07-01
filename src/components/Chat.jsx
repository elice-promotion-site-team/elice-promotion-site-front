import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import io from 'socket.io-client';

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
