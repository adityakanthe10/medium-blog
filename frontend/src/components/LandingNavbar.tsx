import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "../assets/Easy_blog_logo.png";
import { assets } from "../assets/assets";
import MarqueeButton from "./Buttons";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="h-10">
          <Link to="/">
            <img src={assets.logo} alt="logo" className="h-10 auto"></img>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black">
            Our Story
          </Link>
          {/* <Link to="/" className="text-gray-700 hover:text-black">
            Write
          </Link> */}

          {/* Search Bar */}
          {/* <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
          /> */}

          {/* Sign In & Get Started Buttons */}
          <Link to="/signin" className="text-gray-700 hover:text-black">
            Sign In
          </Link>
          <Link to="/signup">
            <MarqueeButton />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
          <Link to="/" className="block pl-2 text-black hover:text-black">
            Our Story
          </Link>
          {/* <Link to="/" className="block text-gray-700 hover:text-black">
            Membership
          </Link> */}
          {/* <Link to="/" className="block text-gray-700 hover:text-black">
            Write
          </Link> */}
          {/* <input
            type="text"
            placeholder="Search"
            className="w-full border rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-blacks"
          /> */}
          {/* <Link to="/signin" className="block text-gray-700 hover:text-black">
            Sign In
          </Link> */}
          <Link to="/signup">
            <MarqueeButton />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
