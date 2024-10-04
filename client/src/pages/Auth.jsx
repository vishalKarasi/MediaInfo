import React, { useState } from "react";
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
import FormInput from "@components/FormInput.jsx";
import Button from "@components/Button.jsx";
import { login, register } from "@app/services/authSlice.js";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const { status } = useSelector((state) => state.auth);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = new FormData(event.target);
    if (!isRegister) {
      await dispatch(register(userData));
      setIsRegister(true);
    } else {
      await dispatch(login(userData));
      navigate("/profile");
    }
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
          <Link onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Register" : "Login"}
          </Link>
        </p>
        <Button
          type="submit"
          label={
            status === "loading"
              ? "Loading..."
              : isRegister
              ? "Login"
              : "Register"
          }
          icon={
            status === "loading" ? (
              ""
            ) : isRegister ? (
              <FaSignInAlt />
            ) : (
              <FaUserPlus />
            )
          }
          className="button"
          disabled={status === "loading"}
        />
      </form>
    </main>
  );
}

export default Auth;
