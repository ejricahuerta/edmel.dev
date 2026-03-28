import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM;

  if (!key) {
    return Response.json(
      { error: "Server missing RESEND_API_KEY." },
      { status: 500 },
    );
  }
  if (!to) {
    return Response.json(
      { error: "Server missing CONTACT_EMAIL." },
      { status: 500 },
    );
  }
  if (!from) {
    return Response.json(
      { error: "Server missing RESEND_FROM (verified sender in Resend)." },
      { status: 500 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Validation failed." }, { status: 400 });
  }

  const { name, email, projectType, message } = parsed.data;
  const resend = new Resend(key);

  const html = `
    <h2 style="font-family:system-ui,sans-serif;font-size:1rem;">New project inquiry</h2>
    <p style="font-family:system-ui,sans-serif;font-size:0.9rem;line-height:1.5;">
      <strong>Name:</strong> ${escapeHtml(name)}<br/>
      <strong>Email:</strong> ${escapeHtml(email)}<br/>
      <strong>Project type:</strong> ${escapeHtml(projectType)}
    </p>
    <p style="font-family:system-ui,sans-serif;font-size:0.9rem;line-height:1.5;">
      <strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}
    </p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `edmel.dev — ${projectType}`,
    html,
  });

  if (error) {
    return Response.json(
      { error: "Could not send email. Try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
