import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const DEDUPE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;   // purge stale entries every 15 min

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'yopmail.com',
  'throwawaymail.com',
  'temp-mail.org',
  'guerrillamailblock.com',
  'grr.la',
  'dispostable.com',
  'sharklasers.com',
  'fakeinbox.com',
  'trashmail.com',
  'trashmail.me',
  'harakirimail.com',
]);

/* ------------------------------------------------------------------ */
/*  In-Memory Stores (per-lambda; sufficient for low/mid traffic)      */
/* ------------------------------------------------------------------ */

type RateLimitEntry = { count: number; windowStart: number };

const ipRateLimit = new Map<string, RateLimitEntry>();
const emailDedupe = new Map<string, number>(); // email → timestamp

// Periodic cleanup to prevent unbounded memory growth
if (typeof globalThis !== 'undefined') {
  const cleanupKey = Symbol.for('__demoSendCleanup');
  if (!(globalThis as Record<symbol, unknown>)[cleanupKey]) {
    (globalThis as Record<symbol, unknown>)[cleanupKey] = true;
    setInterval(() => {
      const now = Date.now();
      for (const [ip, entry] of ipRateLimit) {
        if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) ipRateLimit.delete(ip);
      }
      for (const [email, ts] of emailDedupe) {
        if (now - ts > DEDUPE_WINDOW_MS) emailDedupe.delete(email);
      }
    }, CLEANUP_INTERVAL_MS);
  }
}

/* ------------------------------------------------------------------ */
/*  Resend Client (lazy — avoids crash if key is missing)              */
/* ------------------------------------------------------------------ */

let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

/* ------------------------------------------------------------------ */
/*  Route Handler                                                      */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, website } = body;

    // 1. Honeypot — bots fill hidden fields; silently accept to avoid detection
    if (website) {
      return NextResponse.json({ success: true, message: 'Email queued.' });
    }

    // 2. Presence check
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // 3. Format validation
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // 4. Disposable domain rejection (O(1) Set lookup)
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && DISPOSABLE_DOMAINS.has(domain)) {
      return NextResponse.json(
        { error: 'Please use a real business or personal email address.' },
        { status: 400 },
      );
    }

    // 5. IP rate limiting — max 3 sends per IP per hour
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    const now = Date.now();

    if (ip !== 'unknown') {
      const entry = ipRateLimit.get(ip);
      if (entry) {
        if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
          ipRateLimit.set(ip, { count: 1, windowStart: now });
        } else if (entry.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please try again later.' },
            { status: 429 },
          );
        } else {
          entry.count += 1;
        }
      } else {
        ipRateLimit.set(ip, { count: 1, windowStart: now });
      }
    }

    // 6. Per-email deduplication — max 1 per address per 24 h
    const normalized = email.toLowerCase().trim();
    const lastSentAt = emailDedupe.get(normalized);
    if (lastSentAt && now - lastSentAt < DEDUPE_WINDOW_MS) {
      return NextResponse.json(
        { error: 'A demo email was already sent to this address recently.' },
        { status: 429 },
      );
    }

    // 7. Send via Resend (or mock if API key is missing)
    const resend = getResend();

    if (!resend) {
      // Dev mode: mock so the frontend animation still runs
      emailDedupe.set(normalized, now);
      await new Promise((r) => setTimeout(r, 700));
      return NextResponse.json({
        success: true,
        message: 'Email sent (mocked — no RESEND_API_KEY set).',
      });
    }

    // Using Resend's shared sender — works without a verified custom domain.
    // When you add & verify a domain in Resend, replace with your own address.
    const { error } = await resend.emails.send({
      from: 'The Automation Guys <onboarding@resend.dev>',
      to: [normalized],
      subject: 'Your automation just ran ✅',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #111;">
          <h2 style="margin-top: 0;">Automation Successful ⚡</h2>
          <p>Hi there,</p>
          <p>Glad you tested our live automation workflow. This email was automatically generated and sent instantly&nbsp;— the exact kind of system we build for businesses every day.</p>
          <p>Ready to build a real intelligent operating system for your business?</p>
          <a href="https://theautomationguys.com/#contact"
             style="display: inline-block; padding: 14px 28px; background: #3B82F6; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 700; margin-top: 12px;">
            Book a Free Audit →
          </a>
          <hr style="margin: 40px 0 16px; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #888;">
            The Automation Guys · Panchkula, Haryana, India<br/>
            Founded by Aditya Verma, Manish Yadav &amp; Heemanshu
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[demo-send] Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 },
      );
    }

    emailDedupe.set(normalized, now);
    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    console.error('[demo-send] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
