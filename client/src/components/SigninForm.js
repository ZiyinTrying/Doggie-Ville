import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { UserContext } from "./UserContext";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { users } from "../../../server/data";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const { currentUser, setCurrentUser } = React.useContext(UserContext);
  const { isShowSigninForm, setIsShowSigninForm } =
    React.useContext(UserContext);
  const history = useHistory();

  const handleSignIn = (event) => {
    event.preventDefault();

    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        //   to get user's object info
        const existingUser = data.users.filter((member) => {
          return member.email === email;
        });
        // if this login name is a member
        if (existingUser.length > 0) {
          setCurrentUser(existingUser[0]);
          setIsShowSigninForm(false);
          sessionStorage.clear();
          sessionStorage.setItem("logInUser", JSON.stringify(existingUser[0]));
        } else {
          // no user alert
          window.alert("not found this user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    history.push(`/main`);
  };
  return (
    <Wrapper>
      <Container>
        <form onSubmit={handleSignIn}>
          <p>Already have an account?</p>
          <h1 className="signin-text">Sign In </h1>
          <label>Your email</label>
          <br></br>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <label>Your doggie's name</label> <br></br>
          <input type="text" name="dogname" className="signin-box" />
          <br></br>
          <input type="submit" value="Sign in" className="login-btn" />
        </form>

        <CloseButton
          onClick={() => {
            setIsShowSigninForm(false);
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </CloseButton>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  left: 25%;
  top: 30%;
  z-index: 100;
  width: 30%;
  height: 40%;
  padding: 10px;
  border: 5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(252, 202, 70, 70%);
  border-radius: 8px;
  font-size: 18px;
  box-shadow: 0 60px 120px rgba(71, 69, 123, 0.54),
    0 15px 35px rgba(71, 69, 123, 0.54);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  color: rgb(35, 61, 77);
  p {
    font-size: 15px;
    margin-bottom: 10px;
    margin-left: -50px;
    font-style: italic;
    color: rgb(97, 155, 138);
  }
  input {
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    height: 25px;
    border-radius: 8px;
    padding: 4px 8px;
  }
  h1 {
    margin-bottom: 5px;
    font-size: 20px;
  }

  .login-btn {
    color: white;
    font-size: 15px;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    font-family: var(--heading-font-family);
    border: none;
    background-color: rgb(161, 193, 129);
    transition: transform 300ms ease-in-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      background-color: rgb(35, 61, 77);
    }
  }
`;
const CloseButton = styled.button`
  position: relative;
  top: -10px;
  left: 20%;
  height: 25px;
  background: none;
  color: white;
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  border: none;
  background-color: rgb(161, 193, 129);
  &:hover {
    cursor: pointer;
  }
`;
export default SigninForm;
