import React from 'react'
import { Link } from 'react-router-dom'
import creationsData from '../data/creations.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import backgroundImage from '/images/background.svg';

export default function Creations() {
  return (  
    <>
      <Header />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: `url(${backgroundImage})`}}>
      <main>
      <h1 className="text-3xl text-white text-center font-bold mb-4 mt-4">Creations</h1>
      <ul className="space-y-4 w-full max-w-3xl">
        {creationsData.creations.map((creation, index) => (
          <li key={index} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{creation.type}</h2>
            <p>{creation.details}</p>
          </li>
        ))}
      </ul>
      <div className="mb-8 mt-8 text-center">
        <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
      </main>
    </div>
      <Footer />
        </> 
  )
}
