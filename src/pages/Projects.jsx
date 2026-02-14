import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import projectsData from '../data/repos_github_for_portfolio.json'
import ProjectModal from '../components/ProjectModal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import backgroundImage from '/images/background.svg';

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setModalOpen(false)
  }

  const computeLanguagePercentages = (languages) => {
    const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0)
    return Object.entries(languages).reduce((acc, [lang, bytes]) => {
      if (lang !== 'not available') {
        acc[lang] = ((bytes / totalBytes) * 100).toFixed(2)
      }
      return acc
    }, {})
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8 w-full max-w-screen-xlbg-no-repeat bg-cover bg-fixed" style={{backgroundImage: `url(${backgroundImage})`}}>
        <h1 className="text-3xl text-white text-center font-bold mb-6">Projects</h1>
        <div className="w-full max-w-4xl mx-auto">
          <Carousel 
            showThumbs={false} 
            showStatus={false} 
            infiniteLoop 
            useKeyboardArrows
            className="custom-carousel"
          >
            {projectsData.map((project, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                <a href={project.site_url} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={project.image_path || "/placeholder.svg?height=300&width=400"} 
                    alt={project.name} 
                    className="w-full h-64 object-cover hover:opacity-75 transition-opacity" 
                  />
                </a>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <ul className="mb-4 space-y-1">
                    {Object.entries(computeLanguagePercentages(project.languages)).map(([lang, percentage]) => (
                      <li key={lang} className="text-sm text-gray-500">{lang}: {percentage}%</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openModal(project)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {modalOpen && selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
      {/*<section>
          <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={project.image || '/placeholder.svg?height=200&width=300'}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <button
                    onClick={() => openModal(project)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      <Footer />
    </div>
  )
}
