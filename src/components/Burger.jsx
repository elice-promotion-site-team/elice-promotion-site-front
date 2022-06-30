import React, { useState } from 'react';
import '../css/Burger.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LoginGoogle from './Login';

function Burger() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNavHandler = () => {
    setNavIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="burger" onClick={() => toggleNavHandler()}>
        {navIsOpen ? <FontAwesomeIcon icon={faTimes} size='xl' color='white'/> : <FontAwesomeIcon icon={faBars} size='xl'/>}
      </div>

      <nav className={`navbar ${navIsOpen && 'nav-open'}`}>
        <ul className="nav-links">
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="/trackinfo">트랙설명</a>
          </li>
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="#">신청방법</a>
          </li>
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="#">Quiz</a>
          </li>
          <li className={`nav-link ${navIsOpen && 'nav-link-open'}`}>
            <a href="#">방명록</a>
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

export default Burger;
