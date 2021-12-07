import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

const Header = () => {
  //   let currentUserName = null;
  //   const ifLogin = sessionStorage.getItem("logInUser");
  //   if (ifLogin) {
  //     currentUserName = JSON.parse(sessionStorage.getItem("logInUser")).name;
  //   }

  //   ifLogin ? (
  //     <Wrapper>
  //       <Logo to="/">Facespace</Logo>
  //       <Greeting>
  //         Hello {currentUserName}
  //         <span> 😁</span>
  //       </Greeting>
  //     </Wrapper>
  //   ) : (
  return (
    <Wrapper>
      <Logo to="/">Doggie Ville</Logo>

      <SignIn to="/signin">Sign In</SignIn>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  overflow-x: hidden;
  background-color: var(--color-yellow);
  z-index: 100;
`;
const Logo = styled(Link)`
  color: white;
  font-size: 30px;
  text-align: center;
  text-decoration: none;
  font-family: var(--heading-font-family);
`;
const Greeting = styled.div`
  color: white;
  font-size: 25px;
  text-align: center;
  text-decoration: none;
  font-family: var(--heading-font-family);
`;
const SignIn = styled(Link)`
  color: white;
  font-size: 25px;
  text-align: center;
  text-decoration: none;
  font-family: var(--heading-font-family);
`;
export default Header;
