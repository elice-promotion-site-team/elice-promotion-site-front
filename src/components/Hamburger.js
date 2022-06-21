import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../css/Hamburger.css';

const HamburgerMenu = () => (
  <div className="relative p-2">
    <Menu customBurgerIcon={<HamburgerIcon />} width={'auto'}>
      <Links />
    </Menu>
  </div>
);

const HamburgerIcon = () => (
  <div className="p-1/2">
    <svg
      className="w-8 h-8 text-gray-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </div>
);

export const Links = () => (
  <div className='menuAll'>
    <div className='menu'>
      <a id="Home" href="/TrackInfo">
        Home
      </a>
    </div>
    <div className='menu'>
      <a id="Home" href="/TrackInfo">
        Home
      </a>
    </div>
    <div className='menu'>
      <a id="Home" href="/TrackInfo">
        Home
      </a>
    </div>
    <div className='menu'>
      <a id="Home" href="/TrackInfo">
        Home
      </a>
    </div>
  </div>
);

export default HamburgerMenu;
