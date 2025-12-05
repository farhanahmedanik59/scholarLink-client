import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, Navigate } from "react-router";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-900/90 p-4">
      <div className="w-full max-w-md bg-white/90 p-8 sm:p-10 rounded-xl shadow-2xl transition duration-500 hover:shadow-indigo-300/50">
        <h2 className="text-3xl font-extrabold text-center text-indigo-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to access your personalized scholarship matches.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Standard Login Attempted");
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-150 ease-in-out bg-indigo-600 hover:bg-indigo-700 mb-4">
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={() => console.log("Google Login Attempted")}
          className="w-full flex items-center justify-center btn space-x-3 px-4 py-3 border border-gray-300 rounded-lg shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 mb-6"
        >
          <FaGoogle></FaGoogle>
          <span>Sign in with Google</span>
        </button>

        <div className="text-center mt-6 text-sm">
          <p className="text-gray-600">
            Don't have an account?
            <button onClick={() => console.log("Register clicked")} className="text-orange-600 hover:text-orange-700 font-medium ml-1">
              Register here
            </button>
          </p>
          <Link to={"/"}>
            <button className="mt-4 text-sm text-indigo-500 hover:text-indigo-700 transition duration-150">← Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
