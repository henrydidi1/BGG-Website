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

/**
 * Allowed values for the required `interests` array. We keep
 * this list small and explicit — any other value is rejected so
 * downstream tooling never has to deal with arbitrary strings.
 */
const ALLOWED_INTERESTS = new Set([
  "goradar",
  "global-growth",
  "existing-growth",
  "not-sure",
]);

const MAX_NAME = 200;
const MAX_COMPANY = 200;
const MAX_WEBSITE = 2048;
const MAX_EMAIL = 320;
const MAX_WECHAT = 200;
const MAX_WHATSAPP = 64;
const MAX_MESSAGE = 2000;
const MAX_SOURCE = 64;
const MAX_INTERESTS = 4;

/** Internal enum → human label, used in the email payload. */
const INTEREST_LABELS: Record<string, string> = {
  goradar: "GoRadar AI",
  "global-growth": "Global Growth",
  "existing-growth": "Improve Existing Growth",
  "not-sure": "Not Sure Yet",
};

/** Very small RFC-5322-ish email check — enough for a contact form. */
function isValidEmail(value: string): boolean {
  if (value.length > MAX_EMAIL) return false;
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

/** Deduplicate while preserving insertion order. */
function dedupe(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of list) {
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

interface ParsedPayload {
  name: string;
  company: string;
  website: string;
  email: string;
  interests: string[];
  wechat: string;
  whatsapp: string;
  message: string;
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
  const rawCompany =
    typeof record.company === "string" ? record.company.trim() : "";
  const rawWebsite =
    typeof record.website === "string" ? record.website.trim() : "";
  const rawEmail = typeof record.email === "string" ? record.email.trim() : "";

  const rawInterests = Array.isArray(record.interests)
    ? record.interests
    : [];
  const interestsTrimmed = rawInterests
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  const rawWechat =
    typeof record.wechat === "string" ? record.wechat.trim() : "";
  const rawWhatsapp =
    typeof record.whatsapp === "string" ? record.whatsapp.trim() : "";
  const rawMessage =
    typeof record.message === "string" ? record.message.trim() : "";
  const rawSource =
    typeof record.sourcePlan === "string" ? record.sourcePlan.trim() : "";
  // Honeypot is never announced, but a real human will leave it blank.
  const rawHoneypot =
    typeof record.companyWebsite2 === "string" ? record.companyWebsite2 : "";

  // ── name ────────────────────────────────────────────────
  if (!rawName) return { ok: false, error: "MISSING_NAME" };
  if (rawName.length > MAX_NAME) return { ok: false, error: "NAME_TOO_LONG" };

  // ── company ─────────────────────────────────────────────
  if (!rawCompany) return { ok: false, error: "MISSING_COMPANY" };
  if (rawCompany.length > MAX_COMPANY)
    return { ok: false, error: "COMPANY_TOO_LONG" };

  // ── website (optional) ──────────────────────────────────
  let normalizedWebsite = "";
  if (rawWebsite) {
    normalizedWebsite = normalizeWebsiteUrl(rawWebsite);
    if (!isValidUrl(normalizedWebsite)) {
      return { ok: false, error: "INVALID_WEBSITE" };
    }
  }

  // ── email ───────────────────────────────────────────────
  if (!rawEmail) return { ok: false, error: "MISSING_EMAIL" };
  if (!isValidEmail(rawEmail)) return { ok: false, error: "INVALID_EMAIL" };

  // ── interests (required, array, enum, dedupe, capped) ───
  if (interestsTrimmed.length === 0)
    return { ok: false, error: "MISSING_INTERESTS" };
  const dedupedInterests = dedupe(interestsTrimmed);
  if (dedupedInterests.length > MAX_INTERESTS)
    return { ok: false, error: "TOO_MANY_INTERESTS" };
  for (const interest of dedupedInterests) {
    if (!ALLOWED_INTERESTS.has(interest))
      return { ok: false, error: "INVALID_INTEREST" };
  }

  // ── wechat / whatsapp (optional strings, max length) ────
  if (rawWechat.length > MAX_WECHAT)
    return { ok: false, error: "WECHAT_TOO_LONG" };
  if (rawWhatsapp.length > MAX_WHATSAPP)
    return { ok: false, error: "WHATSAPP_TOO_LONG" };

  // ── message (optional, max length) ──────────────────────
  if (rawMessage.length > MAX_MESSAGE)
    return { ok: false, error: "MESSAGE_TOO_LONG" };

  // ── sourcePlan (enum, capped length) ────────────────────
  if (rawSource.length > MAX_SOURCE)
    return { ok: false, error: "INVALID_SOURCE_PLAN" };
  const normalisedSourcePlan: ParsedPayload["sourcePlan"] = ALLOWED_SOURCE_PLANS.has(
    rawSource,
  )
    ? (rawSource as ParsedPayload["sourcePlan"])
    : "direct";

  return {
    ok: true,
    value: {
      name: rawName,
      company: rawCompany,
      website: normalizedWebsite,
      email: rawEmail,
      interests: dedupedInterests,
      wechat: rawWechat,
      whatsapp: rawWhatsapp,
      message: rawMessage,
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

/** Render an empty optional field as "—", otherwise the value. */
function display(value: string): string {
  const trimmed = value.trim();
  return trimmed ? trimmed : "—";
}

/** Human readable interests joined. */
function formatInterests(interests: string[]): string {
  if (interests.length === 0) return "—";
  return interests
    .map((v) => INTEREST_LABELS[v] ?? v)
    .join(", ");
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

  const {
    name,
    company,
    website,
    email,
    interests,
    wechat,
    whatsapp,
    message,
    sourcePlan,
  } = parsed.value;
  const submittedAt = new Date().toISOString();

  const subject =
    sourcePlan === "direct"
      ? "[BrandGo.Global Lead] New Website Inquiry"
      : `[BrandGo.Global Lead] ${sourcePlan}`;

  const interestsLine = formatInterests(interests);
  const websiteLine = display(website);
  const wechatLine = display(wechat);
  const whatsappLine = display(whatsapp);
  const messageLine = display(message);

  const textBody =
    `New BrandGo.Global website lead\n` +
    `-----------------------------\n` +
    `Submitted at: ${submittedAt}\n` +
    `Name:          ${name}\n` +
    `Company:       ${company}\n` +
    `Website:       ${websiteLine}\n` +
    `Work Email:    ${email}\n` +
    `Interests:     ${interestsLine}\n` +
    `WeChat:        ${wechatLine}\n` +
    `WhatsApp:      ${whatsappLine}\n` +
    `Message:       ${messageLine}\n` +
    `Source Plan:   ${sourcePlan}\n`;

  // Each row HTML-escapes every value before it touches the template.
  const websiteCell = website
    ? `<a href="${escapeHtml(website)}">${escapeHtml(website)}</a>`
    : "—";
  const emailCell = `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`;

  // Build the interests list with one bullet per value (escaped).
  const interestsHtmlList = interests.length
    ? `<ul style="margin:6px 0 0 0;padding-left:20px;">${interests
        .map((v) => `<li>${escapeHtml(INTEREST_LABELS[v] ?? v)}</li>`)
        .join("")}</ul>`
    : "—";

  const htmlBody =
    `<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111">` +
    `<h2 style="margin:0 0 12px 0;">New BrandGo.Global website lead</h2>` +
    `<table cellpadding="6" cellspacing="0" border="0" style="border-collapse:collapse;">` +
    `<tr><td style="color:#555;">Submitted at</td><td><strong>${escapeHtml(submittedAt)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Company / Brand</td><td><strong>${escapeHtml(company)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Website</td><td>${websiteCell}</td></tr>` +
    `<tr><td style="color:#555;">Work Email</td><td>${emailCell}</td></tr>` +
    `<tr><td style="color:#555;">Interests</td><td>${interestsHtmlList}</td></tr>` +
    `<tr><td style="color:#555;">WeChat</td><td><strong>${escapeHtml(wechatLine)}</strong></td></tr>` +
    `<tr><td style="color:#555;">WhatsApp</td><td><strong>${escapeHtml(whatsappLine)}</strong></td></tr>` +
    `<tr><td style="color:#555;">Message</td><td><pre style="font-family:inherit;margin:0;white-space:pre-wrap;">${escapeHtml(messageLine)}</pre></td></tr>` +
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
