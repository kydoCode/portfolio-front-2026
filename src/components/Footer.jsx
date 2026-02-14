import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {

  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 w-full">  {/*  mt-8 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <a href="https://github.com/kydoCode" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/clementsylvain/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <div className="text-sm text-center sm:text-right">
            © {year} - Sylvain CLEMENT - All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
