import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Allowed values for the optional `sourcePlan` field. Anything
 * outside this set is normalised to "direct" so the server never
 * trusts client input blindly.
 */
const ALLOWED_SOURCE_PLANS = new Set([
  "radar",
  "core-engine",
  "fractional-cmo",
  "direct",
]);

const MAX_NAME = 200;
const MAX_WEBSITE = 2048;
const MAX_EMAIL = 320;
const MAX_SOCIAL = 200;
const MAX_SOURCE = 64;

/** Very small RFC-5322-ish email check — enough for a contact form. */
function isValidEmail(value: string): boolean {
  if (value.length > MAX_EMAIL) return false;
  // Simple but effective; matches "local@domain.tld" with a dot in domain.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeWebsiteUrl(value: string): string {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function isValidUrl(value: string): boolean {
  if (value.length > MAX_WEBSITE) return false;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    const hostnameLabels = parsed.hostname.split(".");
    return (
      hostnameLabels.length >= 2 &&
      hostnameLabels.every((label) =>
        /^(?!-)[a-z0-9-]{1,63}(?<!-)$/.test(label),
      )
    );
  } catch {
    return false;
  }
}

/** Escape characters that have a special meaning inside HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ParsedPayload {
  name: string;
  website: string;
  email: string;
  social: string;
  sourcePlan: "radar" | "core-engine" | "fractional-cmo" | "direct";
  /** Honeypot — any value means the submission is non-human. */
  honeypot: string;
}

type ValidationResult =
  | { ok: true; value: ParsedPayload }
  | { ok: false; error: string };

function parseAndValidate(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "INVALID_BODY" };
  }
  const record = body as Record<string, unknown>;

  const rawName = typeof record.name === "string" ? record.name.trim() : "";
  const rawWebsite =
    typeof record.website === "string" ? record.website.trim() : "";
  const rawEmail = typeof record.email === "string" ? record.email.trim() : "";
  const rawSocial =
    typeof record.social === "string" ? record.social.trim() : "";
  const rawSource =
    typeof record.sourcePlan === "string" ? record.sourcePlan.trim() : "";
  // Honeypot is never announced, but a real human will leave it blank.
  const rawHoneypot =
    typeof record.companyWebsite2 === "string" ? record.companyWebsite2 : "";

  if (!rawName) return { ok: false, error: "MISSING_NAME" };
  if (rawName.length > MAX_NAME) return { ok: false, error: "NAME_TOO_LONG" };

  if (!rawWebsite) return { ok: false, error: "MISSING_WEBSITE" };
  const normalizedWebsite = normalizeWebsiteUrl(rawWebsite);
  if (!isValidUrl(normalizedWebsite)) {
    return { ok: false, error: "INVALID_WEBSITE" };
  }

  if (!rawEmail) return { ok: false, error: "MISSING_EMAIL" };
  if (!isValidEmail(rawEmail)) return { ok: false, error: "INVALID_EMAIL" };

  if (!rawSocial) return { ok: false, error: "MISSING_SOCIAL" };
  if (rawSocial.length > MAX_SOCIAL) return { ok: false, error: "SOCIAL_TOO_LONG" };

  // Normalise sourcePlan; reject unknown values by falling back to "direct".
  const normalisedSourcePlan: ParsedPayload["sourcePlan"] = ALLOWED_SOURCE_PLANS.has(
    rawSource,
  )
    ? (rawSource as ParsedPayload["sourcePlan"])
    : "direct";
  if (rawSource.length > MAX_SOURCE) {
    // Defensive: even if someone fuzzes the field with garbage, don't echo.
    return { ok: false, error: "INVALID_SOURCE_PLAN" };
  }

  return {
    ok: true,
    value: {
      name: rawName,
      website: normalizedWebsite,
      email: rawEmail,
      social: rawSocial,
      sourcePlan: normalisedSourcePlan,
      honeypot: rawHoneypot,
    },
  };
}

function jsonResponse(
  body: unknown,
  init: ResponseInit = {},
): Response {
  return Response.json(body, init);
}

/**
 * `POST /api/contact`
 *
 * Validates the submission, sends a lead email via Resend, and
 * intentionally returns generic responses so internal Resend errors
 * never leak through to the browser.
 */
export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    // Server-side misconfiguration — keep the cause out of the response body.
    console.error(
      "[api/contact] missing environment configuration",
      JSON.stringify({
        hasResendKey: Boolean(apiKey),
        hasTo: Boolean(toEmail),
        hasFrom: Boolean(fromEmail),
      }),
    );
    return jsonResponse(
      { ok: false, error: "SERVER_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse(
      { ok: false, error: "INVALID_JSON" },
      { status: 400 },
    );
  }

  const parsed = parseAndValidate(rawBody);
  if (!parsed.ok) {
    return jsonResponse(
      { ok: false, error: parsed.error },
      { status: 422 },
    );
  }

  // Honeypot tripped — pretend everything worked and return 200.
  // We do NOT want to tip off bots that we detected them.
  if (parsed.value.honeypot.length > 0) {
    console.warn(
      "[api/contact] honeypot tripped, dropping silently",
    );
    return jsonResponse({ ok: true }, { status: 200 });
  }

  const { name, website, email, social, sourcePlan } = parsed.value;
  const submittedAt = new Date().toISOString();

  const subject =
    sourcePlan === "direct"
      ? "[BrandGo.Global Lead] New Website Inquiry"
      : `[BrandGo.Global Lead] ${sourcePlan}`;

  const textBody =
    `New BrandGo.Global website lead\n` +
    `-----------------------------\n` +
    `Submitted at: ${submittedAt}\n` +
    `Name:        ${name}\n` +
    `Website:     ${website}\n` +
    `Work Email:  ${email}\n` +
    `WhatsApp / WeChat: ${social}\n` +
    `Source Plan: ${sourcePlan}\n`;

  const htmlBody =
    `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111">` +
    `<h2 style="margin:0 0 12px 0;">New BrandGo.Global website lead</h2>` +
    `<table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;">` +
    `<tr><td style="color:#555;">Submitted at</td><td><strong>${escapeHtml(submittedAt)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Website</td><td><a href="${escapeHtml(website)}">${escapeHtml(website)}</a></td></tr>` +
    `<tr><td style="color:#555;">Work Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>` +
    `<tr><td style="color:#555;">WhatsApp / WeChat</td><td><strong>${escapeHtml(social)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Source Plan</td><td><strong>${escapeHtml(sourcePlan)}</strong></td></tr>` +
    `</table></div>`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (result.error) {
      console.error(
        "[api/contact] Resend returned an error",
        JSON.stringify({ name: result.error.name, message: result.error.message }),
      );
      return jsonResponse(
        { ok: false, error: "DELIVERY_FAILED" },
        { status: 502 },
      );
    }

    return jsonResponse({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] unexpected send error", err);
    return jsonResponse(
      { ok: false, error: "DELIVERY_FAILED" },
      { status: 500 },
    );
  }
}
