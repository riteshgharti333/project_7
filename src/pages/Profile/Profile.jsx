import React, { useContext, useState } from "react";
import { FiUser, FiMail, FiLock, FiEdit, FiCheck, FiX } from "react-icons/fi";
import "./Profile.scss";
import { Context } from "../../context/Context";
import { baseUrl } from "../../main";
import { toast } from "sonner";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openPass, setOpenPass] = useState(false);

  const { user } = useContext(Context);

  const handleEditToggle = () => {
    if (isEditing) {
      setName(tempName);
    } else {
      setTempName(name);
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/auth/change-password`,
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Password updated successfully!");

      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpenPass(false);
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user?.user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h2>{user?.user?.name}</h2>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FiUser className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Full Name</span>
              {/* {isEditing ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="edit-input"
                />
              ) : ( */}
              <span className="detail-value">{user?.user?.name}</span>
              {/* )} */}
            </div>
            {/* <button 
              onClick={handleEditToggle}
              className="edit-button"
            >
              {isEditing ? <FiCheck /> : <FiEdit />}
            </button> */}
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="detail-item">
            <FiMail className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{user?.user?.email}</span>
            </div>
          </div>

          <div className="detail-item">
            <FiLock className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Password</span>
              <span className="detail-value">••••••••</span>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="edit-button"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="password-modal">
            <h3>Update Password</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="input-group">
                <label>Current Password</label>
                <input
                  type={openPass ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type={openPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  type={openPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-check">
                <input
                  id="check"
                  type="checkbox"
                  onChange={(e) => setOpenPass(e.target.checked)}
                />
                <label htmlFor="check">Show Password</label>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
