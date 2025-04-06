import { useSelector } from "react-redux";
import { useRef,useEffect ,useState} from "react";
import axios from "axios";

export default function Profile() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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
      const { data } = await axios.post("http://localhost:4000/api/images/upload", formData);
      setImageUrl(data.imageUrl);
      const currentUserData  = currentUser;
      currentUserData.profilePicture = data.imageUrl;
      localStorage.setItem("currentUser", JSON.stringify(currentUserData));
      
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  return (
    <div className="p-3 max-w-lg  mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <img
          src={currentUser.profilePicture}
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
        />
        <input
          type="EMAIL"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3 "
          defaultValue={currentUser.email}
        />
        <input
          type="text"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3 "
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}
