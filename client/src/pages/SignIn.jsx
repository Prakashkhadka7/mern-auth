import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signinStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md mt-10 border border-slate-200">
      <h1 className="text-3xl text-center font-bold text-slate-800 mb-8">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 text-white py-3 rounded-lg font-semibold uppercase tracking-wide shadow hover:bg-blue-700 transition-all duration-150 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-1 mt-6 text-sm justify-center">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </div>

      {error && (
        <p className="text-red-600 mt-4 text-sm text-center">
          {error?.message || "Something went wrong!"}
        </p>
      )}
    </div>
  );
}
