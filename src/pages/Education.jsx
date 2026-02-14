import React from 'react'
import { Link } from 'react-router-dom'
import educationData from '../data/education_light.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import backgroundImage from '/images/background.svg';

export default function Education() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: `url(${backgroundImage})`}}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">Education</h1>
        <ul className="space-y-6">
          {educationData.education.map((education, index) => (
            <li 
              key={index}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 education-card"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${education.backgroundImage || ''})` }}
              ></div>
              <a 
                href={education.url || '#'} 
                target={education.url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="relative block p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="w-20 h-20 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 overflow-hidden rounded-full">
                    {education.favicon ? (
                      <img 
                        src={education.favicon} 
                        alt={`${education.intitule} favicon`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Favicon
                      </div>
                    )}
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-xl font-semibold mb-2">{education.intitule || 'Unknown Title'}</h2>
                    <p className="text-gray-600 mb-1">{education.annees.join(', ') || 'Unknown Year'}</p>
                    {education.etablissement && <p className="text-gray-600 mb-2">{education.etablissement}</p>}
                    {education.etablissements && (
                      <ul className="list-disc list-inside mt-2 text-gray-600">
                        {education.etablissements.map((etab, etabIndex) => (
                          <li key={etabIndex} className="mb-1">
                            {etab.nom}
                            {etab.intitule && ` - ${etab.intitule}`}
                            {etab.mention && ` (${etab.mention})`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="w-20 h-20 flex-shrink-0 mt-4 sm:mt-0 sm:ml-6 overflow-hidden">
                    {education.logo ? (
                      <img 
                        src={education.logo} 
                        alt={`${education.intitule} logo`} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Logo
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
