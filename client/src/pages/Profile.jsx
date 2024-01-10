import React, { useState } from "react";
import { deleteUser, updateUser } from "@app/services/userSlice.js";
import Button from "@components/Button.jsx";
import MediaCard from "@components/MediaCard.jsx";
import { FaCheckCircle, FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { USER } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    if (editMode) {
      const userData = new FormData(event.target);
      dispatch(updateUser({ userId, userData }));
      setEditMode(false);
    } else setEditMode(true);
  };

  return (
    <main id="profile">
      <section className="userInfo">
        <div className="profilePic">
          <img
            src={
              USER.profilePic &&
              `http://localhost:5000/uploads/${USER.profilePic}`
            }
            alt="pfp"
          />
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
            placeholder={USER.username}
            readOnly={!editMode}
            style={{ backgroundColor: editMode ? "" : "transparent" }}
          />

          <input
            type="text"
            name="email"
            placeholder={USER.email}
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
              onClick={() => {
                dispatch(deleteUser(userId)).then(() => navigate("/auth"));
              }}
            />
          </div>
        </form>
      </section>
      <section className="watchlist">
        <h1>WatchList</h1>
        <div className="watchlistContainer">
          {USER.watchlist &&
            USER.watchlist.map((item, key) => (
              <MediaCard key={key} data={item} type={item.mediaType} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Profile;
