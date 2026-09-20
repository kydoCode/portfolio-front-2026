import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MODELS = {
  projects:       'project',
  experience:     'experience',
  education:      'education',
  hobbies:        'hobby',
  certifications: 'certification',
} as const;

type Collection = keyof typeof MODELS;

const VALID_TOKENS = [
  process.env.ADMIN_SECRET,
  process.env.ADMIN_SECRET_2,
].filter(Boolean);

function checkAuth(req: NextRequest) {
  const token = req.headers.get('x-admin-token');
  return VALID_TOKENS.includes(token ?? '');
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

  const body = await req.json();
  const { action, collection } = body;

  if (!MODELS[collection as Collection]) {
    return NextResponse.json({ error: 'Collection inconnue' }, { status: 400 });
  }

  const model = MODELS[collection as Collection];

  // Toggle visible/featured
  if (!action || action === 'toggle') {
    const { id, field, value } = body;
    if (!['visible', 'featured'].includes(field)) {
      return NextResponse.json({ error: 'Champ non autorisé' }, { status: 400 });
    }
    // @ts-expect-error dynamic model access
    await prisma[model].update({ where: { id }, data: { [field]: value } });
    return NextResponse.json({ success: true });
  }

  // Create
  if (action === 'create') {
    const { data } = body;
    // @ts-expect-error dynamic model access
    const created = await prisma[model].create({ data });
    return NextResponse.json({ success: true, item: created });
  }

  // Update fields
  if (action === 'update') {
    const { id, data } = body;
    // @ts-expect-error dynamic model access
    const updated = await prisma[model].update({ where: { id }, data });
    return NextResponse.json({ success: true, item: updated });
  }

  // Delete
  if (action === 'delete') {
    const { id } = body;
    // @ts-expect-error dynamic model access
    await prisma[model].delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Action inconnue' }, { status: 400 });
}
