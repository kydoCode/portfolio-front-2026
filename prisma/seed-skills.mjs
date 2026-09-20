import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SKILL_CATEGORIES = [
  { label: 'Réseaux & Systèmes (TSSR)', items: ['TCP/IP', 'VLAN', 'DNS', 'DHCP', 'DMZ', 'Active Directory', 'Windows Server', 'Linux', 'pfSense', 'Snort', 'WireGuard', 'OpenVPN', 'SSH', 'Cisco Packet Tracer', 'Ubiquiti', 'Asterisk', 'Proxmox', 'QNAP', 'Fog Server', 'GLPI / ITIL', 'Azure', 'VNC', 'Scripting PowerShell / Bash'] },
  { label: 'Front-end', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Back-end', items: ['Node.js', 'Express.js', 'PHP', 'Symfony', 'Python', 'MySQL', 'PostgreSQL', 'NoSQL'] },
  { label: 'iOS Native', items: ['Swift', 'SwiftUI', 'Tests unitaires'] },
  { label: 'UI/UX & Design', items: ['Figma', 'Canva', 'Maquettage', 'Prototypage', 'Unity', 'Blender'] },
  { label: 'Outils & Méthodes', items: ['Git', 'GitHub', 'SCRUM', 'Kanban', 'VS Code', 'Xcode', 'SEO', 'CMS'] },
  { label: 'IA Générative', items: ['GitHub Copilot', 'ChatGPT', 'Amazon Q', 'Blackbox AI'] },
];

async function main() {
  console.log('Seeding skills...');
  await prisma.skill.deleteMany();
  let globalOrder = 0;
  for (const cat of SKILL_CATEGORIES) {
    for (const name of cat.items) {
      await prisma.skill.create({
        data: { name, category: cat.label, visible: true, featured: false, order: globalOrder++ },
      });
    }
  }
  console.log(`✓ ${globalOrder} skills seedés`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
