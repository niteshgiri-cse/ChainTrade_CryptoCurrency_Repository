import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/State/Auth/Action";
import { useNavigate } from "react-router-dom";

function Signup({ goToLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, jwt } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(register(formData));
    setFormData("")
  };

  useEffect(() => {
    if (jwt) {
      navigate("/"); 
    }
  }, [jwt, navigate]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800">
        Create Account
      </h2>

      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <input
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded text-white font-semibold shadow-lg transition ${
          loading
            ? "bg-[#FE6C02] hover:bg-[#d65114] cursor-not-allowed"
            : "bg-[#FE6C02] hover:bg-[#d65114] hover:scale-[1.02]"
        }`}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={goToLogin}
          className="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </form>
  );
}

export default Signup;
