import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgetPassword";

function Auth() {
  const [activeView, setActiveView] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 px-6 relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-2xl p-10">
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
