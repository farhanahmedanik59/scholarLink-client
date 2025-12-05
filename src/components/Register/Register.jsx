import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage, FaArrowLeft, FaUserGraduate, FaShieldAlt, FaGraduationCap } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password", "");

  // Password validation function
  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must contain at least one special character";
    }
    return true;
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    console.log("Registration data:", data);
  };

  const handleGoogleRegister = () => {
    console.log("Google registration initiated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1A2C] via-[#1A2B4D] to-[#2C3E50] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back to Home */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left Side - Welcome Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="max-w-lg mx-auto lg:mx-0">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl mb-6">
                <FaUserGraduate className="text-white text-3xl" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Start Your <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Scholarship Journey</span>
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">Join thousands of students who have found their dream scholarships through our platform.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                <div className="text-center p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-green-400 mb-1">50K+</div>
                  <p className="text-gray-300 text-sm">Students</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-green-400 mb-1">$200M+</div>
                  <p className="text-gray-300 text-sm">Scholarships</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-green-400 mb-1">40+</div>
                  <p className="text-gray-300 text-sm">Countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:w-1/2 max-w-md w-full">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white text-center mb-2">Create Your Account</h2>
              <p className="text-gray-400 text-center mb-8">Join our community of scholars</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaUser className="text-green-400" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`w-full bg-gray-800/50 border ${
                        errors.name ? "border-red-500/50" : "border-gray-600"
                      } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400 flex items-center gap-1">⚠️ {errors.name.message}</p>}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaEnvelope className="text-green-400" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full bg-gray-800/50 border ${
                        errors.email ? "border-red-500/50" : "border-gray-600"
                      } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center gap-1">⚠️ {errors.email.message}</p>}
                  </div>
                </div>

                {/* Photo URL Field (Optional) */}
                <div className="space-y-2">
                  <label htmlFor="photoURL" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <FaImage className="text-green-400" />
                    Profile Photo URL (Optional)
                  </label>
                  <div className="relative">
                    <input
                      id="photoURL"
                      type="url"
                      {...register("photoURL")}
                      className={`w-full bg-gray-800/50 border ${
                        errors.photoURL ? "border-red-500/50" : "border-gray-600"
                      } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      placeholder="https://example.com/photo.jpg"
                    />
                    {errors.photoURL && <p className="mt-1 text-sm text-red-400 flex items-center gap-1">⚠️ {errors.photoURL.message}</p>}
                  </div>
                  <p className="text-gray-400 text-xs">Leave blank to use default avatar</p>
                </div>

                {/* Password Field with validation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <FaLock className="text-green-400" />
                      Password
                    </label>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                      {showPassword ? (
                        <>
                          <FaEyeSlash />
                          <span>Hide</span>
                        </>
                      ) : (
                        <>
                          <FaEye />
                          <span>Show</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        validate: validatePassword,
                      })}
                      className={`w-full bg-gray-800/50 border ${
                        errors.password ? "border-red-500/50" : "border-gray-600"
                      } rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300`}
                      placeholder="Create a strong password"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-400 flex items-center gap-1">⚠️ {errors.password.message}</p>}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 mt-2">
                    <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <FaShieldAlt className="text-green-400" />
                      Password Requirements:
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${password.length >= 6 ? "bg-green-400" : "bg-gray-600"}`}></span>
                        At least 6 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? "bg-green-400" : "bg-gray-600"}`}></span>
                        One uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${/[a-z]/.test(password) ? "bg-green-400" : "bg-gray-600"}`}></span>
                        One lowercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${/\d/.test(password) ? "bg-green-400" : "bg-gray-600"}`}></span>
                        One number
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "bg-green-400" : "bg-gray-600"}`}></span>
                        One special character
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isLoading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white hover:shadow-lg hover:shadow-green-500/25"
                  } flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FaUserGraduate />
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900 text-gray-400">Or register with</span>
                  </div>
                </div>
              </div>

              {/* Google Register Button */}
              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <div className="w-5 h-5 relative">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <span>Continue with Google</span>
              </button>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Role Info */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-blue-400 text-xl" />
                  <div>
                    <h4 className="text-white font-medium text-sm">Student Account</h4>
                    <p className="text-gray-400 text-xs mt-1">Your account will be created with "Student" role by default.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="text-gray-400 text-sm">
                <div className="text-green-400 font-bold">🔒 Secure</div>
                <p className="mt-1">Encrypted data</p>
              </div>
              <div className="text-gray-400 text-sm">
                <div className="text-blue-400 font-bold">🎓 Student Focused</div>
                <p className="mt-1">Tailored for scholars</p>
              </div>
              <div className="text-gray-400 text-sm">
                <div className="text-cyan-400 font-bold">🌐 Global Access</div>
                <p className="mt-1">Worldwide opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
