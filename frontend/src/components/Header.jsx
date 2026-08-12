import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout, reset, getUserProfile } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !user.name && !user.username) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const onLogout = () => {
    toast.success("Logged out successfully");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-xs">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 text-xl font-bold text-emerald-600 dark:text-emerald-400">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                📊
              </span>
              <span>Lime Survey</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
              }`}
            >
              Home
            </Link>
            <Link
              to="/surveys"
              className={`transition-colors ${
                isActive("/surveys")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
              }`}
            >
              Explore Surveys
            </Link>

            {user && (
              <Link
                to="/my-responses"
                className={`transition-colors ${
                  isActive("/my-responses")
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                }`}
              >
                My Responses
              </Link>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/surveys/add"
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg shadow-xs hover:bg-emerald-700 transition-colors dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  + Create Survey
                </Link>

                {/* Profile & Logout Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                    aria-label="User menu"
                  >
                    <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                      {user.username ? user.username.charAt(0) : "U"}
                    </div>
                  </button>

                  {/* Dropdown Content */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user.username || user.email}
                        </p>
                      </div>

                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg shadow-xs hover:bg-emerald-700 transition-colors dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/surveys"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Explore Surveys
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-responses"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  My Responses
                </Link>
                <Link
                  to="/surveys/add"
                  className="block px-3 py-2 rounded-md text-base font-medium text-emerald-600 font-semibold hover:bg-gray-50 dark:text-emerald-400 dark:hover:bg-gray-800"
                >
                  + Create Survey
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg dark:bg-emerald-500"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;