import React, { useState } from 'react';
import '../css/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faComments } from '@fortawesome/free-solid-svg-icons';
import LoginGoogle from './Login';

function Header() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNavHandler = () => {
    setNavIsOpen((prev) => !prev);
  };
  
  const openChatWindow = () => {
    //만들 팝업창 상하좌우 크기의 1/2 만큼 보정값으로 빼주었음
    const popupX = (document.body.offsetWidth / 2) - (500 / 2);
    const popupY= (window.screen.height / 2) - (700 / 2);
    const option = `status=no, height=700, width=500, left=${popupX}  top=${popupY}`
    window.open('/chat', 'popup', option)
  }

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
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

      <div className={`login ${navIsOpen && 'nav-link-open'}`}>
        <LoginGoogle />
      </div>
    </div>
  );
}

export default Header;
