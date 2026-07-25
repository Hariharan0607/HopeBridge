import { Link, useNavigate } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <FaHandHoldingHeart className="text-3xl text-green-700" />

          <h1 className="text-3xl font-bold text-green-700">
            Hope<span className="text-green-500">Bridge</span>
          </h1>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6 font-medium">

          <Link
            to="/"
            className="hover:text-green-700"
          >
            Home
          </Link>

          {token && user?.role === "donor" && (
            <Link
              to="/donor-dashboard"
              className="hover:text-green-700"
            >
              Dashboard
            </Link>
          )}

          {token && user?.role === "trust" && (
            <Link
              to="/trust-dashboard"
              className="hover:text-green-700"
            >
              Dashboard
            </Link>
          )}

          {token && user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="hover:text-green-700"
            >
              Dashboard
            </Link>
          )}

          {token && (
            <Link
              to="/donate"
              className="hover:text-green-700"
            >
              Donate
            </Link>
          )}

          {token && (
            <Link
              to="/profile"
              className="hover:text-green-700"
            >
              Profile
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-green-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}