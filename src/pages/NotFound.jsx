// import React from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// function NotFound() {
//   return (
//     <div>
//         <Header />
//         <div>
//           <h1 className="text-3xl font-bold mt-4 mb-4">404 - Page not found</h1>
//           <p className="mt-1 text-sm text-gray-500">Désolé, la page que vous cherchez n'existe pas.</p>
//         </div>
//         <Footer />
//     </div>
//   );
// }

// export default NotFound;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center px-4 py-8 bg-white shadow-lg rounded-lg max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
          <p className="text-gray-600 mb-6">Désolé, la page que vous cherchez n'existe pas.</p>
          <a href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Retour à l'accueil
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
