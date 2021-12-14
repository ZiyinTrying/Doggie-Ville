import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const { currentUser, isShowSigninForm, setIsShowSigninForm } =
    React.useContext(UserContext);
  const history = useHistory();
  const [modifyFormData, setModifyFormData] = useState(currentUser);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState(null);

  const handleChange = (value, name) => {
    // every input have a handle change to modify formdata
    setModifyFormData({ ...modifyFormData, [name]: value });
    setErrMessage("");
  };
  const handleModify = (ev) => {
    ev.preventDefault();
    setSubStatus("pending");
    console.log(modifyFormData);

    fetch(`/users/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify(modifyFormData),
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

  return (
    <Wrapper>
      <FormContainer>
        {errMessage ? (
          <ErrorSideImg>
            <ErrorMessage>Ooops! {errMessage}</ErrorMessage>
          </ErrorSideImg>
        ) : (
          <SideImg src="https://res.cloudinary.com/dvmtjbjlp/image/upload/v1639276002/Doggie_Ville_Maps/profiledog_zbhvw6.jpg" />
        )}
        {subStatus !== "confirmed" && currentUser ? (
          <FormContent>
            <FormGroup
              onSubmit={(ev) => {
                handleModify(ev);
              }}
            >
              <h2>Modify your account information</h2>

              <Input
                required="true"
                name="ownerName"
                type="text"
                placeholder="Your username"
                defaultValue={currentUser.ownerName}
                onChange={(ev) => handleChange(ev.target.value, "ownerName")}
              />
              <Input
                name="dogName"
                type="text"
                defaultValue={currentUser.dogName}
                placeholder="Your doggie's name"
                onChange={(ev) => handleChange(ev.target.value, "dogName")}
              />

              <Input
                name="email"
                type="text"
                defaultValue={currentUser.email}
                placeholder="Your Email"
                onChange={(ev) => handleChange(ev.target.value, "email")}
              />

              <Input
                name="dogGender"
                type="text"
                defaultValue={currentUser.dogGender}
                placeholder="your dog is female or male?"
                onChange={(ev) => handleChange(ev.target.value, "dogGender")}
              />

              <label>
                Doggie is
                <NumInput
                  type="number"
                  name="dogAge"
                  defaultValue={currentUser.dogAge.split(" ").slice(0, 1)}
                  onChange={(ev) =>
                    handleChange(`${ev.target.value} years old`, "dogAge")
                  }
                />
                years old
              </label>
              <Input
                name="dogBreed"
                type="text"
                defaultValue={currentUser.dogBreed}
                placeholder="Doggie's Breed?"
                onChange={(ev) => handleChange(ev.target.value, "dogBreed")}
              />

              <label>
                Doggie is
                <NumInput
                  type="number"
                  name="dogWeight"
                  defaultValue={currentUser.dogWeight}
                  onChange={(ev) => handleChange(ev.target.value, "dogWeight")}
                />
                pounds
              </label>

              <Button type="submit">Submit the change</Button>
            </FormGroup>
          </FormContent>
        ) : (
          <SuccessPage>
            {" "}
            <div>
              <FontAwesomeIcon icon={faDog} /> Success!{" "}
              <FontAwesomeIcon icon={faDog} flip="horizontal" />
            </div>
            <SignIn
              onClick={() => {
                history.push(`/main`);
              }}
            >
              Go to the map
            </SignIn>
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
  height: 75vh;
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
  color: rgb(97, 155, 138);
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
  background: rgb(161, 193, 129);
  border-color: transparent;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 auto;
  margin-top: 20px;
  height: 42px;
  width: 90%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const DeleteButton = styled.button`
  background: rgb(97, 155, 138);
  border-color: transparent;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 auto;
  height: 40px;
  width: 90%;
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

export default ProfilePage;
