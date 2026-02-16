import React from 'react';

interface AugmentedDetail {
  prefixe?: string;
  tag: string;
  url?: string;
  important?: boolean;
  suffixe?: string;
}

type Detail = string | AugmentedDetail;

interface ExperienceDetailProps {
  detail: Detail;
}

const ExperienceDetail = ({ detail }: ExperienceDetailProps) => {
  // Cas 1 : Le détail est une simple chaîne de caractères
  if (typeof detail === 'string') {
    return <li className="mb-2 text-gray-700">{detail}</li>;
  }

  // Cas 2 : Le détail est un objet "augmenté" (interpolation sécurisée)
  return (
    <li className="mb-2 text-gray-700">
      {detail.prefixe}
      {detail.url ? (
        <a 
          href={detail.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2 transition-colors"
        >
          {detail.tag}
        </a>
      ) : (
        <span className={detail.important ? "font-bold text-indigo-900" : ""}>
          {detail.tag}
        </span>
      )}
      {detail.suffixe}
    </li>
  );
};

export default ExperienceDetail;
