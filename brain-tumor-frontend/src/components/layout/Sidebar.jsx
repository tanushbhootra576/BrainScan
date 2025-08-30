import { Link, useLocation } from 'react-router-dom';
import {
    FaBrain,
    FaHome,
    FaUpload,
    FaHistory,
    FaInfoCircle,
    FaTimes,
    FaChartBar
} from 'react-icons/fa';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ open, setOpen }) => {
    const location = useLocation();

    const links = [
        { path: '/', icon: <FaHome />, label: 'Dashboard' },
        { path: '/upload', icon: <FaUpload />, label: 'Upload MRI Scan' },
        { path: '/history', icon: <FaHistory />, label: 'Prediction History' },
        { path: '/about', icon: <FaInfoCircle />, label: 'About' },
    ];

    return (
        <div className='sidewala'>

            {open && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-30 backdrop-blur-sm md:hidden"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                ></div>
            )}


            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-dot-pattern sidebar-gradient border-r border-gray-200 shadow-xl transform transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >

                <div className="flex items-center justify-between p-6 border-b border-gray-200 glass-effect">
                    <div className="flex items-center">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg shadow-md">
                            <FaBrain className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-3">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
                                BrainScan
                            </span>
                            <div className="text-xs text-gray-500 mt-0.5">AI Tumor Detection</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
                        aria-label="Close sidebar"
                    >
                        <FaTimes className="h-5 w-5" />
                    </button>
                </div>


                <nav className="p-5">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pl-2">
                        Main Navigation
                    </div>
                    <ul className="space-y-1">
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === link.path
                                        ? 'active-nav-link text-primary-700 font-medium shadow-sm'
                                        : 'text-gray-700 hover:bg-white hover:bg-opacity-70 hover:shadow-sm'
                                        }`}
                                    onClick={() => setOpen(false)}
                                >
                                    <div className={`mr-3 ${location.pathname === link.path ? 'text-primary-600' : 'text-gray-500'}`}>
                                        {link.icon}
                                    </div>
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>


                <div className="px-5 py-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pl-2">
                        Analytics
                    </div>
                    <div className="bg-white bg-opacity-70 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center text-sm">
                            <div className="p-2 rounded-md bg-green-100 text-green-600">
                                <FaChartBar />
                            </div>
                            <div className="ml-3">
                                <div className="text-xs text-gray-500">Accuracy</div>
                                <div className="font-semibold">80.32%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 w-full border-t border-gray-200 glass-effect">
                    <div className="p-4">
                        <div className="text-xs text-gray-500 mb-1">
                            Brain Tumor Classification
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                            <span>Using VGG16 Neural Network</span>
                            <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
