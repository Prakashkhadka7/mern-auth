import { Button } from "@/components/ui/button";
import { FaLock, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800">
            Secure MERN Authentication
          </h1>
          <p className="text-gray-600 text-lg">
            Experience seamless and secure login, registration, and user management using the powerful MERN stack. Built for modern web applications.
          </p>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-base">
              Get Started
            </Button>
            <Button variant="outline" className="text-blue-600 border-blue-600 px-6 py-2 rounded-xl text-base">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
              <div className="flex justify-center mb-6">
                <FaUserShield className="text-blue-600 text-6xl" />
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Auth Dashboard
              </h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                Protect your app with JWT, role-based access, and secure login flows.
              </p>
              <div className="mt-6 flex justify-center">
                <FaLock className="text-gray-400 text-4xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  )
}
