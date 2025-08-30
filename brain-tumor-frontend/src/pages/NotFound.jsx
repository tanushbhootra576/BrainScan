import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
                <FaExclamationTriangle className="mx-auto h-16 w-16 text-yellow-400" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page Not Found</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="flex items-center justify-center btn btn-primary mx-auto w-48"
                    >
                        <FaHome className="mr-2" />
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
