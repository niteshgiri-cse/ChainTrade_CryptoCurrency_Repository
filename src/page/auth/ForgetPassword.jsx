import React from "react";

function ForgotPassword({ goToLogin }) {
  return (
    <form className="space-y-6">

      <p className="text-sm text-gray-600 text-center">
        Enter your email to receive a secure reset link.
      </p>

      <input
        type="email"
        className="w-full px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        placeholder="Enter your email"
        required
      />

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        Send Reset Link
      </button>

      <p className="text-center text-sm text-gray-600">
        Back to{" "}
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

export default ForgotPassword;
