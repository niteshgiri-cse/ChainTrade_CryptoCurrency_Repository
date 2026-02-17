import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-6">

        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Preparing your experience...
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center max-w-md">
          We’re securely checking your session and fetching your data from the server.  
          It may take a few seconds — thank you for your patience 💜
        </p>
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
