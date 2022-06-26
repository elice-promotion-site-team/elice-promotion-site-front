import React from 'react';
import styled from 'styled-components';

const Nav = ({ title }) => {
  return (
    <NavContainer>
      <h1>{title}</h1>
      <NavMenu className="material-icons" onClick={handleNav}>
        menu
      </NavMenu>
    </NavContainer>
  );
};

export default Nav;

const handleNav = () => {
  alert('menu');
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 3%;
  box-sizing:border-box;
  position:fixed;
  width:100%;
  z-index:9999;
  & > h1 {
    font-size: 1.5em;
    flex: 1;
  }
`;

const NavMenu = styled.span`
  cursor: pointer;
`;