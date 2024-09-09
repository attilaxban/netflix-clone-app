import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const [location,setLocation] = useState('');

	const navigate = useNavigate();

	const handleLogOut = async (e: { preventDefault: () => void; }) => {
		e.preventDefault()
		try {
			const response = await fetch('/api/v1/users/logout',{
				method:'POST',
				credentials:'include'
			})
			if(response.ok){
				navigate('/login')
			}else{
				throw new Error("Error during logout");
				
			}
		} catch (error) {
			throw new Error("Internal Server Error");
				
		}
	}
	
	const updateHistory = async (title) => {

		try {
			const response = await fetch('/api/v1/users/update/history',{
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Content-Type' : 'application/json',
				},
				body: JSON.stringify({title:title})
			})
		} catch (error) {
			
		}

	}


	return (
        <div className="bg-black">
		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
			<div className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
				</Link>
				<div className='text-white hidden sm:flex gap-2 items-center'>
					<p className="hover:underline cursor-pointer"
					onClick={() => navigate('/movies', { state: { type :"movies" } })}>
					Movies
					</p>
					<p className="hover:underline cursor-pointer"
					onClick={() => navigate('/tv', { state: { type :"tv" } })}>
					TV Show
					</p>
					<p className="hover:underline cursor-pointer"
					onClick={() => navigate('/media', { state: { type :"movie" } })}>
					My List
					</p>
				</div>
			</div>

			<div className=' text-white flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={"/avatar1.png"} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={handleLogOut} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>
		</header>
        </div>
	);
};
export default Navbar;