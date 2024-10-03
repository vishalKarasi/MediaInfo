import React, { useEffect, useState } from "react";
import {
  deleteUser,
  populateFavorite,
  updateUser,
} from "@app/services/authSlice.js";
import Button from "@components/Button.jsx";
import MediaCard from "@components/MediaCard.jsx";
import { FaCheckCircle, FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const { user, favoriteData } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    if (editMode) {
      const userData = new FormData(event.target);
      dispatch(updateUser(userData));
      setEditMode(false);
    } else setEditMode(true);
  };

  useEffect(() => {
    dispatch(populateFavorite());
  }, [dispatch]);

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
          />

          <input
            type="text"
            name="email"
            placeholder={user.email}
            readOnly={!editMode}
            style={{ backgroundColor: editMode ? "" : "transparent" }}
          />

          <div className="setting">
            <Button
              className="button"
              label={editMode ? "Confirm" : "Edit"}
              icon={editMode ? <FaCheckCircle /> : <FaEdit />}
            />

            <Button
              className="button"
              type="button"
              label="Delete"
              icon={<FaTrash />}
              onClick={() => dispatch(deleteUser())}
            />
          </div>
        </form>
      </section>
      <section className="favorite">
        <h1>WatchList</h1>
        <div className="favoriteContainer">
          {favoriteData &&
            favoriteData.map((item, key) => (
              <MediaCard key={key} data={item} type={item.mediaType} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Profile;
