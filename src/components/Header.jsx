import React, { useState } from 'react';
import '../css/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faComments } from '@fortawesome/free-solid-svg-icons';
import LoginGoogle from './Login';
import { useCookies } from 'react-cookie';

function Header() {
  const [cookies, setCookies] = useCookies(['user_name']);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNavHandler = () => {
    setNavIsOpen((prev) => !prev);
  };

  const openChatWindow = async () => {
    //console.log(cookies.user_name);
    //console.log(cookies.token);
    if (!cookies.user_name || cookies.user_name === 'undefined') {
      alert(`${cookies.user_name}님 구글 로그인으로 사용자 이름을 가져옵니다. 다시한번 접속해 주세요.`);

      try {
        window.location.href = '/auth/google';
        const res = await fetch(`auth/${cookies.token}`);
        const data = await res.json();
        //console.log(data.name);
        await setCookies('user_name', data.name);
      } catch (error) {
        //console.error(error);
      }
    } else {
      alert(`${cookies.user_name}님 환영합니다`);
      //만들 팝업창 상하좌우 크기의 1/2 만큼 보정값으로 빼주었음
      const popupX = document.body.offsetWidth / 2 - 500 / 2;
      const popupY = window.screen.height / 2 - 700 / 2;
      const option = `status=no, height=700, width=500, left=${popupX}  top=${popupY}`;
      window.open('/chat', 'popup', option);
    }
  };

  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <a href="/">Hello-Elice</a>
      </div>
      <div className="burger chatting" onClick={openChatWindow}>
        {navIsOpen ? (
          <FontAwesomeIcon icon={faComments} size="2xl" color="white" />
        ) : (
          <FontAwesomeIcon icon={faComments} size="2xl" />
        )}
      </div>
      <div className="burger" onClick={() => toggleNavHandler()}>
        {navIsOpen ? (
          <FontAwesomeIcon icon={faTimes} size="2xl" color="white" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="2xl" />
        )}
      </div>

      <nav className={`navbar ${navIsOpen && 'nav-open'}`}>
        <ul className="nav-links">
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="/trackinfo">트랙설명</a>
          </li>
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="/trackapply">신청방법</a>
          </li>
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="/quiz">Quiz</a>
          </li>
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="/guestbook">방명록</a>
          </li>
          {/* <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="#">Contact</a>
          </li> */}
        </ul>
      </nav>

      <div className={`login ${navIsOpen && 'nav-link-open'}`}>
        <LoginGoogle />
      </div>
    </div>
  );
}

export default Header;
