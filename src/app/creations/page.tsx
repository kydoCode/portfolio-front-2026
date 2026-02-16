import React from 'react';
import Link from 'next/link';
import creationsData from '@/data/creations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Creation {
  type: string;
  details: string;
}

export default function Creations() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: 'url(/images/background.svg)'}}>
      <Header />
      <main>
        <h1 className="text-3xl text-white text-center font-bold mb-4 mt-4">Creations</h1>
        <ul className="space-y-4 w-full max-w-3xl">
          {(creationsData.creations as Creation[]).map((creation, index) => (
            <li key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold">{creation.type}</h2>
              <p>{creation.details}</p>
            </li>
          ))}
        </ul>
        <div className="mb-8 mt-8 text-center">
          <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
