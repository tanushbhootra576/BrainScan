import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBrain, FaBars, FaTimes, FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onMenuButtonClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/upload':
                return 'Upload MRI Scan';
            case '/history':
                return 'Prediction History';
            case '/about':
                return 'About';
            default:
                return 'Brain Tumor Classification';
        }
    };

    return (
        <nav className="navbar-glass py-3 px-6 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center">
                <button
                    className="mr-4 md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
                    onClick={onMenuButtonClick}
                    aria-label="Toggle sidebar"
                >
                    <FaBars className="h-5 w-5" />
                </button>

                <div className="flex items-center">
                    {/* <Link to="/" className="hidden md:flex md:items-center">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-1.5 rounded-lg shadow-sm">
                            <FaBrain className="h-5 w-5 text-white" />
                        </div>
                        <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 hidden lg:block">BrainScan</span>
                    </Link> */}
                    {/* <div className="h-6 mx-4 border-r border-gray-300 hidden md:block"></div> */}
                    <h1 className="text-xl font-semibold text-gray-800">
                        {getPageTitle()}
                    </h1>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden sm:block">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-40 md:w-64 transition-all"
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 relative transition-all">
                        <FaBell className="h-5 w-5" />
                        <span className="notification-badge"></span>
                    </button>

                    <div className="flex items-center space-x-2">
                        <div className="user-avatar h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold overflow-hidden shadow-sm">
                            <img
                                src="https://randomuser.me/api/portraits/men/44.jpg"
                                alt="User avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-800 hidden md:block">John Doe</span>
                        <FaChevronDown className="h-3 w-3 text-gray-500 hidden md:block" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
