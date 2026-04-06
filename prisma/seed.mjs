import { PrismaClient } from '@prisma/client';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const experienceData = require('../src/data/experience.json');
const educationData = require('../src/data/education_full.json');
const projectsData = require('../src/data/projects.json');
const hobbiesData = require('../src/data/hobbies.json');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.project.deleteMany();
  await prisma.hobby.deleteMany();
  await prisma.certification.deleteMany();

  for (const [i, exp] of experienceData.experience.entries()) {
    await prisma.experience.create({
      data: {
        poste: exp.poste,
        entreprise: exp.entreprise ?? null,
        annees: exp.annees,
        logo: exp.logo ?? null,
        url: exp.url ?? null,
        favicon: exp.favicon ?? null,
        details: exp.details,
        visible: exp.visible ?? true,
        featured: exp.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${experienceData.experience.length} experiences`);

  for (const [i, edu] of educationData.education.entries()) {
    await prisma.education.create({
      data: {
        diplome: edu.intitule,
        etablissement: edu.etablissement ?? '',
        annees: edu.annees ?? [],
        mention: edu.mention ?? null,
        url: edu.url ?? null,
        visible: edu.visible ?? true,
        featured: edu.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${educationData.education.length} educations`);

  for (const [i, proj] of projectsData.projets.entries()) {
    await prisma.project.create({
      data: {
        name: proj.nom,
        description: proj.description,
        context: proj.context ?? null,
        technologies: proj.technologies,
        githubUrl: proj.github ?? null,
        liveUrl: proj.demo ?? null,
        learnings: proj.highlights ?? [],
        visible: proj.visible ?? true,
        featured: proj.featured ?? false,
        order: i,
      },
    });
  }
  console.log(`✓ ${projectsData.projets.length} projects`);

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

  const certs = [
    { nom: 'ISTQB Foundation v4.0', organisme: 'GASQ / CFTL', date: new Date('2025-04-01'), url: 'https://www.cftl.fr', state: 'ACTIVE', visible: true, featured: true, order: 0 },
    { nom: 'Cisco CyberOps Associate', organisme: 'Cisco Networking Academy', date: new Date('2026-01-01'), url: null, state: 'PENDING', visible: true, featured: false, order: 1 },
    { nom: 'C2i Niveau 1', organisme: 'Université de Strasbourg', date: new Date('2014-01-01'), url: null, state: 'ACTIVE', visible: true, featured: false, order: 2 },
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
