import React from "react";
import { LoginUser } from "../../Api-Calls/Login.js";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/authContext.js";
export default function Login() {

  const { reloadUser } = useAuth()
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await LoginUser(userData)

    if (result.status) {
      await reloadUser()
      navigate("/dashboard")
    } else {
      setErrorMsg(result?.data)
      console.log(result?.data)
    }
  }
  return (
    <div
      className="
        min-h-screen w-full flex items-center justify-center p-4
        bg-gradient-to-br from-[#E6F4EF] via-white to-[#CDEAE1]
      "
    >
      <div
        className="
          w-full max-w-md 
          bg-white/60 backdrop-blur-2xl 
          border border-white/40 shadow-2xl 
          rounded-3xl px-8 py-10
        "
      >
        <h2 className="text-3xl font-semibold text-[#0A5244] mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Log in to continue your learning journey.
        </p>

        <form className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              placeholder="Email"
              className="
                w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300
                bg-white/70 backdrop-blur-sm
                focus:border-[#0A5244] focus:ring-2 focus:ring-[#0A5244]/30
                transition-all peer placeholder-transparent
              "
            />
            <label
              className="
                absolute left-4 top-3 text-gray-500 text-sm transition-all 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#0A5244]
                peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
              "
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              placeholder="Password"
              className="
                w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300
                bg-white/70 backdrop-blur-sm
                focus:border-[#0A5244] focus:ring-2 focus:ring-[#0A5244]/30
                transition-all peer placeholder-transparent
              "
            />
            <label
              className="
                absolute left-4 top-3 text-gray-500 text-sm transition-all 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#0A5244]
                peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
              "
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            className="
              w-full py-3 rounded-xl bg-[#0A5244] text-white 
              hover:bg-[#0a5244d6] transition font-medium
            "
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-[#0A5244] font-medium">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}
