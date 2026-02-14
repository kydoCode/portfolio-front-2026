import { X, Github, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation()

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const computeLanguagePercentages = (languages) => {
    const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0)
    return Object.entries(languages).reduce((acc, [lang, bytes]) => {
      if (lang !== 'not available') {
        acc[lang] = ((bytes / totalBytes) * 100).toFixed(2)
      }
      return acc
    }, {})
  }

  const languagePercentages = computeLanguagePercentages(project.languages)

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-2">
                  <img src={project.image_path || "/placeholder.svg?height=200&width=300"} alt={project.name} className="w-full h-48 object-cover rounded-md hover:opacity-75" />
                  <p className="text-sm text-gray-500 mt-2">{project.description || t('projectModal.noDescription')}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('projectModal.languages')}</h4>
                    <ul className="mt-2 space-y-1">
                      {Object.entries(languagePercentages).map(([lang, percentage]) => (
                        <li key={lang} className="text-sm text-gray-500">{lang}: {percentage}%</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('projectModal.technologies')}</h4>
                    <ul className="mt-2 space-y-1">
                      {Object.entries(project.detected_technologies).map(([tech, count]) => (
                        <li key={tech} className="text-sm text-orange-500 bg-orange-100 px-2 py-1 rounded-md inline-block">{tech}: {count}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('projectModal.htmlVersion')}</h4>
                    <p className="text-sm text-gray-500">{project.html_version || t('projectModal.notSpecified')}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('projectModal.modernityScore')}</h4>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm  text-gray-500">{t('projectModal.accessibility')}: {project.modernity_score?.accessibility || t('projectModal.notAvailable')}</li>
                      <li className="text-sm text-gray-500">{t('projectModal.bestPractices')}: {project.modernity_score?.best_practices || t('projectModal.notAvailable')}</li>
                      <li className="text-sm text-gray-500">{t('projectModal.cleanCode')}: {project.modernity_score?.clean_code || t('projectModal.notAvailable')}</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('Context')}</h4>
                    <p className="text-sm text-gray-500">{project.context || t('projectModal.noContext')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <Github className="mr-2 h-5 w-5" />
              {t('projectModal.viewOnGithub')}
            </a>
            {project.site_url && (
              <a
                href={project.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <Globe className="mr-2 h-5 w-5" />
                {t('projectModal.visitSite')}
              </a>
            )}
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t('projectModal.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
