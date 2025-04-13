import { GoogleAuthProvider,signInWithPopup,getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleGoogleClick =  async() => {
        try {
         const provider = new GoogleAuthProvider();
         const auth = getAuth(app);
         const result = await signInWithPopup(auth, provider);
         console.log("Results",result);
         const res = await fetch("/api/auth/google",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.
              photoURL})
         })
         const data = await res.json();
         dispatch(signInSuccess(data));
         console.log(data);
         navigate("/")
        }catch(error){
            console.log(error);
        }
    }
  return (
      // <button type="button" onClick={handleGoogleClick} className=' bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with google</button>
      <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full border border-gray-300 rounded-md px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
    >
      <FcGoogle className="text-xl" />
      <span>Sign in with Google</span>
    </button>
  )
}
