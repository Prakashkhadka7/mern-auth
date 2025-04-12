import { useSelector } from "react-redux";
import { useRef,useEffect ,useState} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import { showSuccessToast, showErrorAlert, showConfirmAlert } from "../utils/alert.jsx";
import { deleteUserSuccess, deleteUserStart, deleteUserFailure } from "../redux/user/userSlice";
export default function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {currentUser, loading, error }= useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleUpload();
  }}, [image]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post(`${apiUrl}/api/images/upload`, formData);
      setFormData({ ...formData, profilePicture: data.imageUrl });
      
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDelete = () => {
    showConfirmAlert({
      title: 'Delete your account?',
      text: 'This action is permanent.',
      confirmText: 'Yes, delete it!',
      cancelText: 'No, cancel',
      onConfirm: async () => {
        try {
          dispatch(deleteUserStart());
          const response = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: "DELETE",
          });
          const data = await response.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data));
            showErrorAlert('Failed to delete account.');
            return;
          }
          dispatch(deleteUserSuccess(data));
          showSuccessToast('Account deleted!');
        } catch (error) {
          dispatch(deleteUserFailure(error));
          showErrorAlert('Failed to delete account.');
        }
      },
    });
  };


  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profiePicture"
          className="h-24 w-24 cursor-pointer rounded-full object-cover mt-2 self-center "
          onClick={() => fileRef.current.click()}
        />
        <input type="file" onChange={handleImageChange} id="file" ref={fileRef} style={{ display: "none" }} accept="image/*"/>
        <input
          type="text"
          id="username"  
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="EMAIL"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 "
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Updating..." : "Update"}
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'  }</p>
      <p className="text-green-700 mt-5">{updateSuccess && 'User updated successfully'  }</p>
    </div>
  );
}
