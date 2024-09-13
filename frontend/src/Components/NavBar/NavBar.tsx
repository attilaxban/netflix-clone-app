/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, X } from "lucide-react";

const Navbar = ({ setter, value, handler }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
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

  return (
    <div className="bg-black">
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          <Link to="/home">
            <img
              src="/netflix-logo.png"
              alt="Netflix Logo"
              className="w-32 sm:w-40"
            />
          </Link>
          <div className="text-white hidden sm:flex gap-2 items-center">
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/movies", { state: { type: "movies" } })}
            >
              Movies
            </p>
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/tv", { state: { type: "tv" } })}
            >
              TV Show
            </p>
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/mylist")}
            >
              My List
            </p>
          </div>
        </div>
        <div className="text-white flex gap-2 items-center z-50">
          <div className="relative flex justify-center items-center">
            {isSearchOpen ? (
              <input
                type="text"
                className="bg-gray-700 text-white p-1 rounded"
                placeholder="Search..."
                value={value}
                onChange={handler}
              />
            ) : (
              <Search
                className="size-6 cursor-pointer"
                onClick={toggleSearch}
              />
            )}
            {isSearchOpen && (
              <X className="size-6 cursor-pointer" onClick={toggleSearch} />
            )}
          </div>
          <Link to="/profile">
            <img
              src={"/avatar1.png"}
              alt="Avatar"
              className="h-8 rounded cursor-pointer"
            />
          </Link>
          <LogOut className="size-6 cursor-pointer" onClick={handleLogOut} />
          <div className="sm:hidden">
            <Menu
              className="size-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
          <X
            onClick={() => history.back()}
            className="text-red-600 hover:cursor-pointer hover:text-gray-400"
            size={36}
            strokeWidth={3}
          />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
