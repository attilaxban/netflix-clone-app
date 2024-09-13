import { IUser } from "./IUser";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Registration = () => {
  const { searchParams } = new URL(window.location.href);
  const emailAddress = searchParams.get("email");

  const [user, setUser] = useState<IUser | null>({
    email: emailAddress || "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email || !user?.username || !user?.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log(
          `Server responsed with ${response.status} status` +
            { message: "success" }
        );

        navigate("/login");
      } else {
        setError(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      setError(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  return (
    <div className="h-screen w-full main-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 bg-black/60">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
                <input
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser!,
                      email: e.target.value,
                    }))
                  }
                  className="bg-black/60 h-14 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="example@example.com"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
                <input
                  type="text"
                  value={user?.username || ""}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser!,
                      username: e.target.value,
                    }))
                  }
                  className="bg-black/60 h-14 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Username"
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
                <input
                  type="password"
                  value={user?.password || ""}
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser!,
                      password: e.target.value,
                    }))
                  }
                  className="bg-black/60 h-14 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                />
              </label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-900"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-600 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
