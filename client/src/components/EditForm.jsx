import { updateUser } from "@app/services/authSlice.js";
import React from "react";
import { FaCheckCircle, FaEnvelope, FaFile, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button.jsx";
import FormInput from "./FormInput.jsx";

function EditForm() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const INPUTS = [
    {
      type: "file",
      name: "profilePic",
      icon: <FaFile />,
      errorMessage: "Please enter a valid file",
    },
    {
      label: "Username",
      type: "text",
      name: "username",
      icon: <FaUser />,
      pattern: "^[A-Za-z0-9]{4,16}$",
      errorMessage: "Please enter a valid username",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: <FaEnvelope />,
      errorMessage: "Please enter a valid email",
    },
  ];

  const handleEdit = () => {
    dispatch(updateUser({ userId, userData }));
  };
  return (
    <form
      method="POST"
      encType="multipart/form-data"
      className="authForm"
      onSubmit={handleEdit}
    >
      <h1>Edit User info</h1>

      {INPUTS.map((input, index) => (
        <FormInput key={index} {...input} />
      ))}
      <Button
        type="submit"
        label="Confirm"
        icon={<FaCheckCircle />}
        className="button"
      />
    </form>
  );
}

export default EditForm;
