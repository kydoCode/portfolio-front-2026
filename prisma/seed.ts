import { PrismaClient } from '@prisma/client';
import experienceData from '../src/data/experience.json';
import educationData from '../src/data/education_full.json';
import projectsData from '../src/data/projects.json';
import hobbiesData from '../src/data/hobbies.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  // Clear
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.hobby.deleteMany();
  await prisma.certification.deleteMany();

  // Experience
  for (const [i, exp] of experienceData.experience.entries()) {
    await prisma.experience.create({
      data: {
        poste: exp.poste,
        entreprise: 'entreprise' in exp ? exp.entreprise as string : null,
        annees: exp.annees,
        logo: 'logo' in exp ? exp.logo as string : null,
        url: 'url' in exp ? exp.url as string : null,
        favicon: 'favicon' in exp ? exp.favicon as string : null,
        details: exp.details,
        visible: exp.visible ?? true,
        featured: exp.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${experienceData.experience.length} experiences`);

  // Education
  for (const [i, edu] of educationData.education.entries()) {
    await prisma.education.create({
      data: {
        diplome: edu.intitule,
        etablissement: 'etablissement' in edu ? edu.etablissement as string : '',
        mention: 'mention' in edu ? edu.mention as string : null,
        url: 'url' in edu ? edu.url as string : null,
        visible: edu.visible ?? true,
        featured: edu.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${educationData.education.length} educations`);

  // Projects
  for (const [i, proj] of projectsData.projets.entries()) {
    await prisma.project.create({
      data: {
        name: proj.nom,
        description: proj.description,
        context: proj.context ?? null,
        technologies: proj.technologies,
        githubUrl: proj.github ?? null,
        liveUrl: proj.demo ?? null,
        learnings: 'highlights' in proj ? proj.highlights as string[] : [],
        visible: proj.visible ?? true,
        featured: proj.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${projectsData.projets.length} projects`);

  // Hobbies
  for (const [i, hobby] of hobbiesData.hobbies.entries()) {
    await prisma.hobby.create({
      data: {
        name: hobby.categorie,
        description: hobby.details.join(', '),
        visible: hobby.visible ?? true,
        featured: hobby.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${hobbiesData.hobbies.length} hobbies`);

  // Certifications
  const certs = [
    { nom: 'ISTQB Foundation v4.0', organisme: 'GASQ / CFTL', date: new Date('2025-04-01'), url: 'https://www.cftl.fr', visible: true, featured: true, order: 0 },
    { nom: 'Cisco CyberOps Associate', organisme: 'Cisco Networking Academy', date: new Date('2026-01-01'), url: null, visible: true, featured: false, order: 1 },
    { nom: 'C2i Niveau 1', organisme: 'Université de Strasbourg', date: new Date('2014-01-01'), url: null, visible: true, featured: false, order: 2 },
  ];
  for (const cert of certs) {
    await prisma.certification.create({ data: cert });
  }
  console.log(`✓ ${certs.length} certifications`);

  console.log('Seed terminé.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
