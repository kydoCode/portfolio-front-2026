import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code, Globe, Lightbulb } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import backgroundImage from '/images/background.svg';

export default function About() {
  const [selectedSection, setSelectedSection] = useState('')

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value)
  }

  const navigateToSection = () => {
    if (selectedSection) {
      const sectionElement = document.getElementById(selectedSection)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="p-auto m-auto min-h-screen bg-gray-100 bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: `url(${backgroundImage})`}}>
      {/* py-12 px-4 sm:px-6 lg:px-8*/}
      <div>
        <Header />
        <h1 className="text-3xl text-white font-bold text-gray-900 mt-8 mb-8">About Me</h1>

        <div className="mb-8">
          <label htmlFor="section-select" className="block text-sm font-medium text-gray-700">
            Jump to Section
          </label>
          <select
            id="section-select"
            name="section-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={selectedSection}
            onChange={handleSectionChange}
          >
            <option value="">Select a section</option>
            <option value="about-me">About Me</option>
            <option value="expertise">Technical Expertise</option>
            <option value="problem-solving">Problem-Solving Skills</option>
            <option value="collaborative-approach">Collaborative Approach</option>
            <option value="mission">My Mission</option>
          </select>
          <button
            type="button"
            className="mt-2 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={navigateToSection}
          >
            Go
          </button>
        </div>

        <div id="about-me" className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sylvain</h2>
            <p className="text-gray-600 mb-6">
              Passionate Full Stack Developer | Problem Solver | Tech Enthusiast
            </p>
            <div className="prose max-w-none text-gray-500">
              <p>
                Hello! I'm Sylvain, a full stack developer with a passion for creating elegant, efficient, and user-friendly web applications. With several years of experience in the tech industry, I've honed my skills in both front-end and back-end development, always staying up-to-date with the latest technologies and best practices.
              </p>
              <p className="mt-4">
                My journey in tech began with a fascination for how things work, which led me to pursue a degree in Computer Science. Since then, I've worked on a diverse range of projects, from small business websites to large-scale enterprise applications, always striving to deliver high-quality solutions that meet and exceed client expectations.
              </p>
            </div>
          </div>
        </div>

        <div id="expertise" className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What I Bring to the Table</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">Technical Expertise</h3>
                      <Code className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <p className="mt-1 text-gray-500 text-sm">Proficient in multiple programming languages and frameworks</p>
                  </div>
                </div>
              </li>
              <li id="problem-solving" className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">Problem-Solving Skills</h3>
                      <Lightbulb className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <p className="mt-1 text-gray-500 text-sm">Analytical thinker with a knack for innovative solutions</p>
                  </div>
                </div>
              </li>
              <li id="collaborative-approach" className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">Collaborative Approach</h3>
                      <Globe className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <p className="mt-1 text-gray-500 text-sm">Excellent communicator and team player</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div id="mission" className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">My Mission</h2>
            <p className="text-gray-600">
              My goal is to leverage my skills and passion for technology to create impactful digital solutions that solve real-world problems. I'm constantly learning and evolving, always excited to take on new challenges and push the boundaries of what's possible in web development.
            </p>
          </div>
        </div>
        <div className="mb-8 mt-8 text-center">
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  )
}
