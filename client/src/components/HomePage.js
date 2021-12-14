import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SigninForm from "./SigninForm";
import { UserContext } from "./UserContext";

const Homepage = () => {
  const history = useHistory();
  const { setIsShowSigninForm, isShowSigninForm } =
    React.useContext(UserContext);
  const handleClickStart = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      history.push(`/main`);
    }
  };
  const handleClickSignUp = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      history.push(`/signup`);
    }
  };
  return (
    <>
      <Wrapper>
        <Img src="https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" />
        <Side>
          <Description>
            Are you ready to take your dog out for a fun day?
          </Description>
          <MainButton onClick={handleClickStart}>Get start!</MainButton>
          <SignUpButton onClick={handleClickSignUp}>Sign Up</SignUpButton>
        </Side>
        {isShowSigninForm && <SigninForm />}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  margin-top: 50px;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-LightGreen);
  display: flex;
  /* justify-content: center;
  align-items: center; */
  overflow: hidden;
`;
const Img = styled.img`
  left: 0;
  width: 70%;
  height: 100%;
  object-fit: cover;
  /* flex: 2; */
`;
const Side = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--color-LightGreen);
  flex: 1;
`;
const MainButton = styled.button`
  width: 150px;
  height: 40px;
  margin-bottom: 100px;
`;
const SignUpButton = styled.button`
  width: 150px;
  height: 40px;
`;

const Description = styled.div`
  margin-bottom: 70px;
  padding: 10px;
  font-size: 18px;
`;
export default Homepage;
