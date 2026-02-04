import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgetPassword";

function Auth() {
  const [activeView, setActiveView] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-6 relative overflow-hidden">

      {/* Soft background blur circles */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          ChainTrade
        </h1>

        <p className="text-gray-600 text-center mt-2 mb-10 text-sm">
          Secure. Elegant. Powerful.
        </p>

        {activeView === "login" && (
          <Login
            goToSignup={() => setActiveView("signup")}
            goToForgot={() => setActiveView("forgot")}
          />
        )}

        {activeView === "signup" && (
          <Signup goToLogin={() => setActiveView("login")} />
        )}

        {activeView === "forgot" && (
          <ForgotPassword goToLogin={() => setActiveView("login")} />
        )}

      </div>
    </div>
  );
}

export default Auth;
