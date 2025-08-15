import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    navigate("/"); // Redirect Home 
};

return (
  <div className="flex min-h-screen flex-col justify-center lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/images/logo.png" alt="Your Company" className="mx-auto h-16 w-auto" />
      <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-black">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-[16px] font-medium text-black">
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-sky-300 px-3 py-1.5 text-black placeholder:text-gray-500 focus:outline-sky-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-[16px] font-medium text-black">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-sky-300 px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline-sky-500"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-sky-500  px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
);
}