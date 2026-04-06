import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MODELS = {
  projects:   'project',
  experience: 'experience',
  education:  'education',
  hobbies:    'hobby',
  certifications: 'certification',
} as const;

type Collection = keyof typeof MODELS;

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-token') === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [projects, experience, education, hobbies, certifications] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.education.findMany({ orderBy: { order: 'asc' } }),
    prisma.hobby.findMany({ orderBy: { order: 'asc' } }),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }),
  ]);

  return NextResponse.json({
    projects:       { projets: projects },
    experience:     { experience },
    education:      { education },
    hobbies:        { hobbies },
    certifications: { certifications },
  });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { collection, id, field, value } = await req.json();

  if (!MODELS[collection as Collection]) {
    return NextResponse.json({ error: 'Collection inconnue' }, { status: 400 });
  }
  if (!['visible', 'featured'].includes(field)) {
    return NextResponse.json({ error: 'Champ non autorisé' }, { status: 400 });
  }

  const model = MODELS[collection as Collection];
  // @ts-expect-error dynamic model access
  await prisma[model].update({ where: { id }, data: { [field]: value } });

  return NextResponse.json({ success: true });
}
