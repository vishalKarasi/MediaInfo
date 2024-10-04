import React, { useEffect, useState } from "react";
import { deleteUser, updateUser } from "@app/services/authSlice.js";
import Button from "@components/Button.jsx";
import MediaCard from "@components/MediaCard.jsx";
import { FaCheckCircle, FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const { user, favoriteData, status } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = async (event) => {
    event.preventDefault();
    if (editMode) {
      const userData = new FormData(event.target);
      await dispatch(updateUser(userData));
      setEditMode(false);
    } else setEditMode(true);
  };

  return (
    <main id="profile">
      <section className="userInfo">
        <div className="profilePic">
          <img src={user.profilePic} alt="pfp" />
          {editMode && (
            <label htmlFor="edit" className="editPfp">
              <FaFile />
            </label>
          )}
        </div>

        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleEdit}
          className="editForm"
        >
          <input
            type="file"
            name="profilePic"
            id="edit"
            style={{ display: "none" }}
          />

          <input
            type="text"
            name="username"
            placeholder={user.username}
            readOnly={!editMode}
            style={{ backgroundColor: editMode ? "" : "transparent" }}
            required
          />

          <input
            type="text"
            name="email"
            placeholder={user.email}
            readOnly={!editMode}
            style={{ backgroundColor: editMode ? "" : "transparent" }}
            required
          />

          <div className="setting">
            <Button
              className="button"
              label={
                status === "loading"
                  ? "loading..."
                  : editMode
                  ? "Confirm"
                  : "Edit"
              }
              icon={
                status === "loading" ? null : editMode ? (
                  <FaCheckCircle />
                ) : (
                  <FaEdit />
                )
              }
              disabled={status === "loading"}
            />

            <Button
              className="button"
              type="button"
              label={status === "loading" ? "loading..." : "Delete"}
              icon={status === "loading" ? null : <FaTrash />}
              onClick={() => dispatch(deleteUser())}
              disabled={status === "loading"}
            />
          </div>
        </form>
      </section>
      <section className="favorite">
        <h1>WatchList</h1>
        <div className="favoriteContainer">
          {favoriteData?.map((item, key) => (
            <MediaCard key={key} data={item} type={item.mediaType} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Profile;
