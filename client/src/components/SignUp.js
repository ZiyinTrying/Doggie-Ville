import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState(null);

  const { currentUser, isShowSigninForm, setIsShowSigninForm } =
    React.useContext(UserContext);

  const handleChange = (value, name) => {
    // every input have a handle change to modify formdata
    setFormData({ ...formData, [name]: value });
    setErrMessage("");
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSubStatus("pending");
    console.log(formData);
    fetch("/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status, message } = json;
        if (status === 201) {
          setSubStatus("confirmed");
          setErrMessage(null);
        } else if (message) {
          setSubStatus("error");
          console.log(message);
          setErrMessage(message);
        }
      });
  };

  const handleSigninClick = () => {
    setIsShowSigninForm(true);
    history.push(`/`);
  };

  return (
    <Wrapper>
      <FormContainer>
        {errMessage ? (
          <ErrorSideImg>
            <ErrorMessage>Ooops! {errMessage}</ErrorMessage>
          </ErrorSideImg>
        ) : (
          <SideImg src="https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639167609/Doggie_Ville_Maps/ja-san-miguel-_-QQuvAwQ-0-unsplash_kpxpu4.jpg" />
        )}
        {subStatus !== "confirmed" ? (
          <FormContent>
            <FormGroup
              onSubmit={(ev) => {
                handleSubmit(ev);
              }}
            >
              <h2>Provide information for signing up</h2>

              <Input
                required="true"
                name="ownerName"
                type="text"
                placeholder="Your username"
                onChange={(ev) => handleChange(ev.target.value, "ownerName")}
              />
              <Input
                name="dogName"
                type="text"
                placeholder="Your doggie's name"
                onChange={(ev) => handleChange(ev.target.value, "dogName")}
              />

              <Input
                name="email"
                type="text"
                placeholder="Your Email"
                onChange={(ev) => handleChange(ev.target.value, "email")}
              />

              <Input
                name="dogGender"
                type="text"
                placeholder="your dog is female or male?"
                onChange={(ev) => handleChange(ev.target.value, "dogGender")}
              />

              <label>
                Doggie is
                <NumInput
                  type="number"
                  name="dogAge"
                  onChange={(ev) =>
                    handleChange(`${ev.target.value} years old`, "dogAge")
                  }
                />
                years old
              </label>
              <Input
                name="dogBreed"
                type="text"
                placeholder="Doggie's Breed?"
                onChange={(ev) => handleChange(ev.target.value, "dogBreed")}
              />

              <label>
                Doggie is
                <NumInput
                  type="number"
                  name="dogWeight"
                  onChange={(ev) => handleChange(ev.target.value, "dogWeight")}
                />
                pounds
              </label>

              <Button type="submit">Submit</Button>
            </FormGroup>
          </FormContent>
        ) : (
          <SuccessPage>
            {" "}
            <div>
              <FontAwesomeIcon icon={faDog} /> Success!{" "}
              <FontAwesomeIcon icon={faDog} flip="horizontal" />
            </div>
            <SignIn onClick={handleSigninClick}>Sign In Now</SignIn>
          </SuccessPage>
        )}
      </FormContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  width: 100vw;
  height: 100vh;
  background-color: rgb(161, 193, 129, 50%);
`;
const FormContainer = styled.div`
  margin: 0 auto;
  width: 70vw;
  height: 70vh;
  margin-top: 3%;

  display: flex;
  background-color: white;
  box-shadow: 0 60px 120px rgba(71, 69, 123, 0.24),
    0 15px 35px rgba(71, 69, 123, 0.24);
`;
const SideImg = styled.img`
  width: 40%;
  object-fit: cover;
`;
const ErrorSideImg = styled.div`
  background-image: url("https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639244585/Doggie_Ville_Maps/errordog_u6yllt.jpg");
  background-size: cover;
  background-position: bottom;
  width: 40%;
`;
const ErrorMessage = styled.p`
  color: black;
  font-weight: bold;
  text-align: center;
  position: relative;
  top: 30%;
  font-size: 20px;
  color: white;
`;
const SuccessPage = styled.div`
  color: var(--color-dark-blue);
  font-size: 30px;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FormContent = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
`;
const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
`;
const NumInput = styled.input`
  width: 40px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;
const Input = styled.input`
  margin-top: 10px;
  width: 90%;
  height: 30px;
`;
const Button = styled.button`
  position: relative;
  background: rgb(35, 61, 77);
  border-color: transparent;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 16px auto;
  height: 42px;
  width: 90%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const SignIn = styled.button`
  color: white;
  font-size: 25px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-family: var(--heading-font-family);
  border: none;
  background-color: rgb(161, 193, 129);
  &:hover {
    cursor: pointer;
  }
`;

export default SignUp;
