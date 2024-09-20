/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const DeleteProfile = ({ setDeleting } : {setDeleting : any}) => {
  const [email, setEmail] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log(
          `Server responsed with ${response.status}` + { message: "success" }
        );
        navigate("/login");
      } else {
        throw new Error(
          `Server responsed with ${response.status} status` +
            { message: response.status }
        );
      }
    } catch (error) {
      console.error(error);
      throw new Error(
        `Server responsed with 500 status.` +
          { message: "Internal server error" }
      );
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/users/delete", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        handleLogOut(e);
      } else {
        console.log(`Server responsed with ${response.status} status`);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      {confirm ? (
        <div className="bg-black/60 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Do you want to delete your profile?
          </h2>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={(e) => handleDelete(e)}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirm(false);
                setDeleting(false);
              }}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-black/60 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Enter your email address
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Email"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
