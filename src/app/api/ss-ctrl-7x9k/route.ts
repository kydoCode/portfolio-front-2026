import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src/data');

const FILES: Record<string, string> = {
  projects: 'projects.json',
  experience: 'experience.json',
  education: 'education_full.json',
  hobbies: 'hobbies.json',
};

function checkAuth(req: NextRequest) {
  const token = req.headers.get('x-admin-token');
  return token === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data: Record<string, unknown> = {};
  for (const [key, file] of Object.entries(FILES)) {
    const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    data[key] = JSON.parse(raw);
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { collection, index, field, value } = await req.json();

  if (!FILES[collection]) return NextResponse.json({ error: 'Collection inconnue' }, { status: 400 });
  if (!['visible', 'featured'].includes(field)) return NextResponse.json({ error: 'Champ non autorisé' }, { status: 400 });

  const filePath = path.join(DATA_DIR, FILES[collection]);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const listKey = Object.keys(data)[0];
  if (!Array.isArray(data[listKey]) || index < 0 || index >= data[listKey].length) {
    return NextResponse.json({ error: 'Index invalide' }, { status: 400 });
  }

  data[listKey][index][field] = value;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}
