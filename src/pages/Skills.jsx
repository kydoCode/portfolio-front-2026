import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Accordion from '../components/Accordion.jsx'
import softskillsData from '../data/softskills.json'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaPhp, FaNodeJs, FaPython, 
  FaSwift, FaTrello, FaGithub, FaFigma, FaProjectDiagram, FaRobot
} from 'react-icons/fa'
import { 
  SiTailwindcss, SiBootstrap, SiMysql, SiExpress, SiPostgresql, 
  SiMongodb, SiSwift, SiVisualstudiocode, SiXcode, SiGithubcopilot, SiEslint
} from 'react-icons/si'
import { BsKanban } from 'react-icons/bs'
import backgroundImage from '/images/background.svg';

export default function Skills() {
  const [accordionState, setAccordionState] = useState({});

  useEffect(() => {
    const initialState = {};
    softskillsData.competences.techniques.forEach((item, index) => {
      initialState[`item-${index}`] = false;
    });
    softskillsData.competences.transversales.forEach((item, index) => {
      initialState[`item-${index}`] = false;
    });
    setAccordionState(initialState);
  }, []);

  const handleAccordionChange = (itemId) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const getIcon = (skill) => {
    switch (skill.toLowerCase()) {
      case 'html': return <FaHtml5 className="h-5 w-5 text-gray-400 mr-2" />;
      case 'css': return <FaCss3Alt className="h-5 w-5 text-gray-400 mr-2" />;
      case 'javascript': return <FaJs className="h-5 w-5 text-gray-400 mr-2" />;
      case 'react': return <FaReact className="h-5 w-5 text-gray-400 mr-2" />;
      case 'tailwind css': return <SiTailwindcss className="h-5 w-5 text-gray-400 mr-2" />;
      case 'bootstrap': return <SiBootstrap className="h-5 w-5 text-gray-400 mr-2" />;
      case 'php': return <FaPhp className="h-5 w-5 text-gray-400 mr-2" />;
      case 'mysql': return <SiMysql className="h-5 w-5 text-gray-400 mr-2" />;
      case 'node.js': return <FaNodeJs className="h-5 w-5 text-gray-400 mr-2" />;
      case 'express.js': return <SiExpress className="h-5 w-5 text-gray-400 mr-2" />;
      case 'vue.js': return <FaVuejs className="h-5 w-5 text-gray-400 mr-2" />;
      case 'python': return <FaPython className="h-5 w-5 text-gray-400 mr-2" />;
      case 'postgresql': return <SiPostgresql className="h-5 w-5 text-gray-400 mr-2" />;
      case 'nosql': return <SiMongodb className="h-5 w-5 text-gray-400 mr-2" />;
      case 'swift': return <FaSwift className="h-5 w-5 text-gray-400 mr-2" />;
      case 'swiftui': return <SiSwift className="h-5 w-5 text-gray-400 mr-2" />;
      case 'kanban': return <BsKanban className="h-5 w-5 text-gray-400 mr-2" />;
      case 'scrum': return <FaProjectDiagram className="h-5 w-5 text-gray-400 mr-2" />;
      case 'trello': return <FaTrello className="h-5 w-5 text-gray-400 mr-2" />;
      case 'vs code': return <SiVisualstudiocode className="h-5 w-5 text-gray-400 mr-2" />;
      case 'xcode': return <SiXcode className="h-5 w-5 text-gray-400 mr-2" />;
      case 'github': return <FaGithub className="h-5 w-5 text-gray-400 mr-2" />;
      case 'copilot': return <SiGithubcopilot className="h-5 w-5 text-gray-400 mr-2" />;
      case 'chatgpt': return <FaRobot className="h-5 w-5 text-gray-400 mr-2" />;
      case 'linters': return <SiEslint className="h-5 w-5 text-gray-400 mr-2" />;
      case 'figma': return <FaFigma className="h-5 w-5 text-gray-400 mr-2" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: `url(${backgroundImage})`}}>
        <h1 className="text-3xl text-white font-bold mb-8">Skills</h1>
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Hard Skills</h2>
            <Accordion 
              items={softskillsData.competences.techniques.map(item => ({
                ...item,
                details: item.details.map(detail => ({
                  text: detail,
                  icon: getIcon(detail)
                }))
              }))} 
              onChange={handleAccordionChange} 
              className="w-full"
            />
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Soft Skills</h2>
            <Accordion 
              items={softskillsData.competences.transversales.map(item => ({
                ...item,
                details: item.details.map(detail => ({
                  text: detail,
                  icon: getIcon(detail)
                }))
              }))} 
              onChange={handleAccordionChange} 
              className="w-full"
            />
          </section>
        </div>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}