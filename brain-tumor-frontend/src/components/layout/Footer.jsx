import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-glass py-4 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="copyright-text text-sm font-medium">
                    &copy; {currentYear} Brain Tumor Classification. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 mt-3 md:mt-0">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                        GitHub
                    </a>
                    <a
                        href="#"
                        className="footer-link text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="footer-link text-gray-600 hover:text-primary-600 transition-colors text-sm"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
