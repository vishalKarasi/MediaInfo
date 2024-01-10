import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaFile,
} from "react-icons/fa";
import FormInput from "@components/FormInput";
import Button from "@components/Button";
import { login, register, toggleAuth } from "@app/services/authSlice";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegister } = useSelector((state) => state.auth);

  const INPUTS = [
    {
      type: "file",
      name: "profilePic",
      icon: <FaFile />,
      errorMessage: "Please enter a valid file",
      show: !isRegister,
    },
    {
      label: "Username",
      type: "text",
      name: "username",
      icon: <FaUser />,
      pattern: "^[A-Za-z0-9]{4,16}$",
      errorMessage: "Please enter a valid username",
      show: !isRegister,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: <FaEnvelope />,
      errorMessage: "Please enter a valid email",
      show: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: <FaLock />,
      pattern:
        "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$",
      errorMessage: "Please enter a valid password",
      show: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = new FormData(event.target);
    if (!isRegister) dispatch(register(userData));
    else dispatch(login(userData)).then(() => navigate("/"));
  };

  return (
    <main className="flex">
      <form
        method="POST"
        encType="multipart/form-data"
        className="authForm"
        onSubmit={handleSubmit}
      >
        <h1>{isRegister ? "Login" : "Register"}</h1>

        {INPUTS.map(
          (input, index) =>
            input.show && <FormInput key={index} {...input} show="" />
        )}

        <p>
          <span>
            {isRegister ? "Dont have account?" : "Already have account?"}
          </span>
          <Link onClick={() => dispatch(toggleAuth())}>
            {isRegister ? "SignUp" : "SignIn"}
          </Link>
        </p>
        <Button
          type="submit"
          label={isRegister ? "SignIn" : "SignUp"}
          icon={isRegister ? <FaSignInAlt /> : <FaUserPlus />}
          className="button"
        />
      </form>
    </main>
  );
}

export default Auth;
