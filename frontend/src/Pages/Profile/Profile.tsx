import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteProfile } from "../../Components/DeleteProfile/DeleteProfile";

export const Profile = () => {
  const [password, setPassoword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleLogOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        console.log(
          `Server responsed witg ${response.status} status` +
            { message: "success" }
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

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/users/credentials/update", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
      });

      if (response.ok) {
        console.log(
          `Server responsed witg ${response.status} status` +
            { message: "success" }
        );
        handleLogOut(e);
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

  return (
    <div className="main-bg min-h-screen flex items-center justify-center">
      {deleting ? (
        <DeleteProfile setDeleting={setDeleting} />
      ) : (
        <div className="bg-black/60 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white">Settings</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassoword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                New Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() =>
                  deleting ? setDeleting(false) : setDeleting(true)
                }
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
              >
                {deleting ? "Cancel" : "Delete"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
