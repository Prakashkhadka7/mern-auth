import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaReact, FaNodeJs, FaDatabase, FaLock } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800">About This Project</h1>
          <p className="text-gray-600 text-lg">
            This is a full-stack authentication application built using the MERN stack. It demonstrates secure user login, signup, and role-based access using technologies like JWT and bcrypt.
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">Tech Stack</h2>
            <div className="flex gap-4 text-blue-600 text-2xl">
              <FaReact title="React" />
              <FaNodeJs title="Node.js" />
              <FaDatabase title="MongoDB" />
              <FaLock title="JWT Auth" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>JWT-based Authentication</li>
              <li>Role-Based Authorization</li>
              <li>Protected Routes</li>
              <li>Frontend + Backend Integration</li>
              <li>Clean, Responsive UI with Tailwind CSS</li>
            </ul>
          </div>

          <div className="pt-6 flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-base">
              View GitHub
            </Button>
            <Button variant="outline" className="text-blue-600 border-blue-600 px-6 py-2 rounded-xl text-base">
              Home
            </Button>
          </div>
        </motion.div>

        {/* Illustration Section */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-sm">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
              <div className="text-center text-blue-600 text-6xl mb-4 flex justify-center">
                <FaLock />
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Built with Security in Mind
              </h2>
              <p className="text-gray-500 text-sm text-center mt-2">
                Protecting user data through secure login systems, encrypted passwords, and token validation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
