import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((store) => store.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-6">
        
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Getting things ready for you...
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center max-w-md">
          Our server is fetching your data.  
          This may take a few seconds depending on your connection.  
          Thanks for your patience 🙏
        </p>

      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
