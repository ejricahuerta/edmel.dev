import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Resend only sends from verified domains; extract the mailbox for the From header. */
function parseVerifiedFromAddress(resendFromEnv: string): string | null {
  const trimmed = resendFromEnv.trim();
  const bracket = trimmed.match(/<([^>]+)>/);
  const raw = bracket ? bracket[1].trim() : trimmed;
  if (!/^[^\s<>]+@[^\s<>]+$/.test(raw)) {
    return null;
  }
  return raw;
}

/** Display name: visitor name + email; envelope From stays verified (deliverability). */
function buildFromHeader(
  verifiedAddress: string,
  visitorName: string,
  visitorEmail: string,
): string {
  const safeEmail = visitorEmail.replace(/[\r\n"<>]/g, "").trim().slice(0, 254);
  const safeName = visitorName
    .replace(/[\r\n"\\<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  if (!safeEmail) {
    return verifiedAddress;
  }
  const display =
    safeName.length > 0 ? `${safeName} (${safeEmail})` : safeEmail;
  return `"${display}" <${verifiedAddress}>`;
}

function buildPlainTextBody(
  name: string,
  email: string,
  projectType: string,
  message: string,
): string {
  return [
    "New contact form message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    "",
    "Message:",
    message,
  ].join("\n");
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

  const verifiedAddress = parseVerifiedFromAddress(from);
  if (!verifiedAddress) {
    return Response.json(
      {
        error:
          "RESEND_FROM must include a verified address, e.g. \"Name <hello@yourdomain.com>\".",
      },
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
    <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111;">
      <strong>Name:</strong> ${escapeHtml(name)}<br/>
      <strong>Email:</strong> ${escapeHtml(email)}<br/>
      <strong>Project type:</strong> ${escapeHtml(projectType)}
    </p>
    <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111;">
      <strong>Message</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}
    </p>
  `;

  const text = buildPlainTextBody(name, email, projectType, message);
  const fromHeader = buildFromHeader(verifiedAddress, name, email);

  const { error } = await resend.emails.send({
    from: fromHeader,
    to: [to],
    replyTo: email,
    subject: `Contact: ${projectType}`,
    text,
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
