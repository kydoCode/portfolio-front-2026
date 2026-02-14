import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/">
              <img src="https://i.ibb.co/zsHCctJ/logo-coder.jpg" alt="Logo" className="h-10 w-auto rounded-full" />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              <Home className="h-5 w-5" />
            </Link>
            {['Projects', 'Skills', 'Experience', 'Creations', 'Education', 'Hobbies', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-gray-500 hover:text-gray-900 text-sm lg:text-base"
              >
                {t(`nav.${item.toLowerCase()}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="bg-white border-gray-300 rounded-md text-gray-700 text-sm"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <nav className="md:hidden pb-4">
            <Link to="/" className="block text-gray-500 hover:text-gray-900 py-2">
              <Home className="h-5 w-5" />
            </Link>
            {['Projects', 'Skills', 'Experience', 'Creations', 'Education', 'Hobbies', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block text-gray-500 hover:text-gray-900 py-2"
              >
                {t(`nav.${item.toLowerCase()}`)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
