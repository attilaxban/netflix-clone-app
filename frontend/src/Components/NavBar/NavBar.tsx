import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, X } from "lucide-react";

const Navbar = ({setter,value,handler}) => {


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const navigate = useNavigate();


  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/login');
      } else {
        throw new Error("Error during logout");
      }
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };



  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return (
    <div className="bg-black">
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
          <Link to="/home">
            <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40" />
          </Link>
          <div className="text-white hidden sm:flex gap-2 items-center">
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate('/movies', { state: { type: "movies" } })}
            >
              Movies
            </p>
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate('/tv', { state: { type: "tv" } })}
            >
              TV Show
            </p>
            <p
              className="hover:underline cursor-pointer"
              onClick={() => navigate('/mylist')}
            >
              My List
            </p>
          </div>
        </div>
        <div className="text-white flex gap-2 items-center z-50">
          <div>
            {isSearchOpen ? (
              <input
                type="text"
                className="bg-gray-700 text-white p-1 rounded"
                placeholder="Search..."
                value={value}
                onChange={handler}
              />
            ) : (
              <Search className="size-6 cursor-pointer" onClick={toggleSearch} />
            )}
            {isSearchOpen && <X className="size-6 cursor-pointer" onClick={toggleSearch} />}
          </div>
          <img src={"/avatar1.png"} alt="Avatar" className="h-8 rounded cursor-pointer" />
          <LogOut className="size-6 cursor-pointer" onClick={handleLogOut} />
          <div className="sm:hidden">
            <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
          </div>
          <div className='absolute right-3'>
          <X onClick={() => history.back()} className='text-red-600 hover:cursor-pointer hover:text-gray-400' size={36} strokeWidth={3}/>
        </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
