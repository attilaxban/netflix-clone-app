import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const [location,setLocation] = useState('');


	return (
        <div className="bg-black">
		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
			<div className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
				</Link>

				{/* desktop navbar items */}
				<div className='text-white hidden sm:flex gap-2 items-center'>
					<Link to='/' className='hover:underline' onClick={() => setLocation("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline' onClick={() => setLocation("tv")}>
						Tv Shows
					</Link>
					<Link to='/history' className='hover:underline'>
						My List
					</Link>
				</div>
			</div>

			<div className=' text-white flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={"/avatar1.png"} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={() => setLocation('/logout')} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>
		</header>
        </div>
	);
};
export default Navbar;