import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Service non configuré' }, { status: 503 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL ?? 'sylvain.clement.dev@gmail.com',
      replyTo: email,
      subject: `[Portfolio] Message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:monospace;background:#050a12;color:#fff;padding:24px;border:1px solid #00F5FF">
          <p style="color:#00F5FF;margin:0 0 16px">&gt; TRANSMISSION_REÇUE</p>
          <p><strong style="color:#00F5FF">FROM:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong style="color:#00F5FF">MESSAGE:</strong></p>
          <p style="white-space:pre-wrap;opacity:0.85">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
