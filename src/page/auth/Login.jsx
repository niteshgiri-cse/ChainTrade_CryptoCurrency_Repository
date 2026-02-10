import { login } from "@/State/Auth/Action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Login({ goToSignup, goToForgot }) {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(login(formData))
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800">
        Log In
      </h2>
    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            placeholder="Enter your password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-sm text-indigo-600 hover:text-indigo-800"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Forgot password */}
      <div className="flex justify-between text-sm">
        <button
          type="button"
          onClick={goToForgot}
          className="text-gray-600 hover:text-indigo-600 transition"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded bg-[#FE6C02] hover:bg-[#d65114] from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={goToSignup}
          className="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </form>
  );
}

export default Login;
