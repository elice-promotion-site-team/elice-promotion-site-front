import React, { useState } from 'react';
import '../css/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginGoogle from './Login';

function Header() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNavHandler = () => {
    setNavIsOpen((prev) => !prev);
  };

  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <a href="/">Hello-Elice</a>
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
