'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Laptop, Code, Briefcase, Palette, GraduationCap, Heart, User, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProjectModal from '@/components/ProjectModal';
import { Carousel } from 'react-responsive-carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import reposData from '@/data/repos_github_for_portfolio.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Project {
  name: string;
  description?: string;
  image_path?: string;
  languages: Record<string, number>;
  detected_technologies: Record<string, number>;
  html_version?: string;
  modernity_score?: {
    accessibility?: string;
    best_practices?: string;
    clean_code?: string;
  };
  context?: string;
  repo_url: string;
  site_url?: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredWork = [
    { title: t('nav.projects'), description: t('featuredWork.projectsDesc'), icon: <Laptop />, link: '/projects' },
    { title: t('nav.skills'), description: t('featuredWork.skillsDesc'), icon: <Code />, link: '/skills' },
    { title: t('nav.experience'), description: t('featuredWork.experienceDesc'), icon: <Briefcase />, link: '/experience' },
    { title: t('nav.creations'), description: t('featuredWork.creationsDesc'), icon: <Palette />, link: '/creations' },
    { title: t('nav.education'), description: t('featuredWork.educationDesc'), icon: <GraduationCap />, link: '/education' },
    { title: t('nav.hobbies'), description: t('featuredWork.hobbiesDesc'), icon: <Heart />, link: '/hobbies' },
    { title: t('nav.about'), description: t('featuredWork.aboutDesc'), icon: <User />, link: '/about' },
    { title: t('nav.contact'), description: t('featuredWork.contactDesc'), icon: <Mail />, link: '/contact' },
  ];

  const openModal = (project: Project) => {
    setModalOpen(true);
    setSelectedProject(project);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8 w-full max-w-screen-xl bg-no-repeat bg-cover bg-fixed" style={{backgroundImage: 'url(/images/background.svg)'}}>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-full w-full object-cover md:w-48" src="https://i.ibb.co/yN7YVXc/avatar-homepage.jpg" alt="Profile picture" />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold text-blue-600">{t('hero.subtitle')}</div>
              <h2 className="mt-2 text-4xl font-bold text-gray-900">{t('hero.title')}</h2>
              <p className="mt-2 text-gray-600">{t('hero.description')}</p>
              <div className="mt-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {t('hero.cta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl text-white font-bold mt-8 mb-8 text-center">Portfolio</h1>

        <div className="mt-12">
          <h2 className="text-2xl text-white font-bold text-gray-900">{t('featuredWork.title')}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredWork.map((item, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.title}</dt>
                        <dd className="mt-1 text-sm text-gray-900">{item.description}</dd>
                      </dl>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Link
                        href={item.link}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {t('featuredWork.viewButton')}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl text-white font-bold text-gray-900">{t('latestProjects.title')}</h2>
          <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
            {(reposData as any[]).slice(0, 6).map((project, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{project.description || t('latestProjects.noDescription')}</p>
                  <div className="mt-4">
                    <img src={project.image_path || "/placeholder.svg?height=200&width=300"} alt={project.name} className="w-full h-48 object-cover rounded-md mb-4" />
                    <button
                      onClick={() => openModal(project)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        
        {modalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </main>
      <Footer />
    </div>
  );
}
