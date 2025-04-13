import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";
import {
  showSuccessToast,
  showErrorAlert,
  showConfirmAlert,
} from "../utils/alert.jsx";
import { Button } from "@/components/ui/button";
import { FaUserEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");
    const formPayload = new FormData();
    formPayload.append("image", image);
    try {
      const { data } = await axios.post(`${apiUrl}/api/images/upload`, formPayload);
      setFormData({ ...formData, profilePicture: data.imageUrl });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDelete = () => {
    showConfirmAlert({
      title: "Delete your account?",
      text: "This action is permanent.",
      confirmText: "Yes, delete it!",
      cancelText: "No, cancel",
      onConfirm: async () => {
        try {
          dispatch(deleteUserStart());
          const response = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data));
            showErrorAlert("Failed to delete account.");
            return;
          }
          dispatch(deleteUserSuccess(data));
          showSuccessToast("Account deleted!");
        } catch (error) {
          dispatch(deleteUserFailure(error));
          showErrorAlert("Failed to delete account.");
        }
      },
    });
  };

  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      showErrorAlert(error?.message ?? "Failed to signout.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 flex items-center justify-center">
      <motion.div
        className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          <FaUserEdit className="inline-block mr-2" /> Profile Settings
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover self-center border-4 border-blue-200 cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          <input
            type="file"
            ref={fileRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3 border focus:outline-none focus:ring-2 focus:ring-blue-300"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3 border focus:outline-none focus:ring-2 focus:ring-blue-300"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="New Password"
            className="bg-slate-100 rounded-lg p-3 border focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
          />
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Updating..." : "Update Profile"}
          </Button>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <button type="button" onClick={handleDelete} className="flex items-center gap-1 text-red-600 hover:text-red-800">
              <FaTrashAlt /> Delete Account
            </button>
            <button type="button" onClick={handleSignOut} className="flex items-center gap-1 text-red-600 hover:text-red-800">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 mt-4 text-center">Something went wrong</p>}
        {updateSuccess && <p className="text-green-600 mt-4 text-center">Profile updated successfully!</p>}
      </motion.div>
    </div>
  );
}
