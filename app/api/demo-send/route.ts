import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: Add RESEND_API_KEY to your .env.local file!
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// --- Basic In-Memory Rate Limiter & Deduplication ---
// (In production, replace with Upstash Redis if running heavily distributed serverless functions)

type RateLimitEntry = { count: number; firstSeen: number };

const ipRateLimit = new Map<string, RateLimitEntry>();
const emailDedupe = new Map<string, number>();

const RATE_LIMIT_MAX = 3; // 3 emails
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const DEDUPE_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in ms

// Simple list of common disposable domains to reject
const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com', 
  'yopmail.com', 'throwawaymail.com', 'temp-mail.org'
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, website } = body;

    // 1. Honeypot Check (bots fill invisible fields, humans don't)
    if (website) {
      console.warn("Honeypot filled, silently rejecting.");
      // Return 200 so the bot thinks it succeeded
      return NextResponse.json({ success: true, message: 'Email queued.' });
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 2. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // 3. Disposable Domain Check
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && DISPOSABLE_DOMAINS.includes(domain)) {
      return NextResponse.json({ error: 'Please use a real business or personal email address.' }, { status: 400 });
    }

    // 4. IP Rate Limiting (Max 3 per hour)
    const forwardedFor = req.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    const now = Date.now();
    if (ip !== 'unknown') {
      const ipEntry = ipRateLimit.get(ip);
      if (ipEntry) {
        if (now - ipEntry.firstSeen > RATE_LIMIT_WINDOW) {
          // Reset window
          ipRateLimit.set(ip, { count: 1, firstSeen: now });
        } else {
          if (ipEntry.count >= RATE_LIMIT_MAX) {
            return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
          }
          ipEntry.count += 1;
        }
      } else {
        ipRateLimit.set(ip, { count: 1, firstSeen: now });
      }
    }

    // 5. Deduplication (Max 1 per email address per 24h)
    const normalizedEmail = email.toLowerCase().trim();
    const lastSent = emailDedupe.get(normalizedEmail);
    if (lastSent && now - lastSent < DEDUPE_WINDOW) {
      return NextResponse.json({ error: 'A demo email was already sent to this address recently.' }, { status: 429 });
    }

    // 6. Send the Email via Resend
    // Skip actual sending if there's no API key (prevents crashing during development)
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is missing. Mocking success response.');
      // Register dedupe even if mocked, for testing limits
      emailDedupe.set(normalizedEmail, now);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, message: 'Email sent successfully! (Mocked)' });
    }

    const { data, error } = await resend.emails.send({
      from: 'The Automation Guys <demo@theautomationguys.com>', // MUST be a verified domain in Resend
      to: [normalizedEmail],
      subject: 'Your automation just ran ✅',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2>Automation Successful ⚡</h2>
          <p>Hi there,</p>
          <p>Glad you tested our live automation workflow. This email was automatically generated and sent instantly using Next.js and Resend.</p>
          <p>Ready to build a real intelligent operating system for your business?</p>
          <a href="https://theautomationguys.com/#contact" style="display: inline-block; padding: 12px 24px; background-color: #3B82F6; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 16px;">
            Book an Audit
          </a>
          <p style="margin-top: 40px; font-size: 12px; color: #666;">
            The Automation Guys • Panchkula, Haryana, India
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
    }

    // Record success in dedupe cache
    emailDedupe.set(normalizedEmail, now);

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
