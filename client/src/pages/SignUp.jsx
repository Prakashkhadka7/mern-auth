import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleGoogleSignIn = () => {
    window.open("/api/auth/google", "_self");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        <h1 className="text-3xl text-center font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
          <FaLock /> Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="bg-blue-50 pl-10 pr-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-blue-50 pl-10 pr-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-blue-50 pl-10 pr-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="flex items-center justify-center mt-2">
            <div className="w-full h-px bg-blue-100" />
            <span className="text-sm text-gray-400 px-3">or</span>
            <div className="w-full h-px bg-blue-100" />
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 gap-2"
            variant="outline"
          >
            <FcGoogle className="text-xl" /> Sign up with Google
          </Button>
        </form>

        <div className="flex gap-1 justify-center text-sm mt-6">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>

        {error && (
          <p className="text-red-600 mt-4 text-sm text-center">
            Something went wrong!
          </p>
        )}
      </div>
    </motion.div>
  );
}