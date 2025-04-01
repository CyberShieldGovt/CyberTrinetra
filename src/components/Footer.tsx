
import { Link } from 'react-router-dom';
import { Shield, Instagram, Linkedin, Twitter, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyber-navy py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-cyber-blue" />
              <span className="font-display text-xl font-bold text-white">CyberTrinetra</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your guardian against digital threats. We are dedicated to empowering individuals in the 
              fight against cybercrimes with a secure and user-friendly platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-gray-300 hover:text-cyber-blue transition-colors duration-200">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">Pooja Arcade, 2nd Floor</p>
              <p className="mb-2">Kammanahalli, Kalyan Nagar</p>
              <p className="mb-2">Bengaluru, Karnataka</p>
              <p className="mb-2">India</p>
              <p className="mb-2">Phone: +91 9876543210</p>
              <p>Email: support@cybertrinetra.com</p>
            </address>
          </div>
        </div>
       
        {/* Added disclaimer section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-gray-400 text-sm">
          <div className="bg-cyber-navy/50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-300 mb-2">Disclaimer</h4>
            <p className="mb-2">
             CyberTrinetra is a platform for reporting and tracking cyber crimes. We do not provide legal services or guarantee case resolutions. Cases related to women and children are free, with optional donations, while others may have service charges upon resolution.
            </p>
            <p>
              CyberTrinetra is not a substitute for professional legal advice or law enforcement. In case of 
              emergencies or immediate threats, please contact your local law enforcement agencies directly.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CyberTrinetra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
