import React from "react";
import styled from "styled-components";
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
          <Description>
            Check out all the doggie-friendly places nearby!
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
  background-size: 50% auto;
  background-position: bottom;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgb(161, 193, 129, 70%);
  flex: 1;
  padding: 10px;
  button {
    background: rgb(97, 155, 138, 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    margin: 15px;
    width: 90%;
    height: 60px;
    letter-spacing: 2.5px;
    font-weight: 700;
    color: white;
    border: 1px solid white;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    font-size: 18px;
    &:hover {
      background-color: rgb(161, 193, 129);
      box-shadow: 0px 15px 20px rgb(161, 193, 129, 0.4);
      color: #fff;
      transform: translateY(-4px);
    }
  }
`;
const MainButton = styled.button`
  margin-bottom: 100px;
`;
const SignUpButton = styled.button``;

const Description = styled.div`
  font-weight: 700;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  line-height: 30px;
  font-style: italic;
  font-size: 25px;
  text-align: center;
  color: white;
  :nth-child(2) {
    color: rgb(97, 155, 138);
  }
`;
export default Homepage;
