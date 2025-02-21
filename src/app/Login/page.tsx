"use client";
import { useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 max-w-md w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-teal-600 mb-6">
          Login to Your Account
        </h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 w-full border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
        />
        <button
          className="mt-4 w-full bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 transition duration-200"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-teal-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
