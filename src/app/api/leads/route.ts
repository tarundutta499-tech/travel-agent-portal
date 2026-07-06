import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, destination, date, guests, notes, website_confirm } = body;

    // 1. Basic Honeypot Spam Protection
    if (website_confirm && website_confirm.trim() !== '') {
      // Silently discard spam but return success code to fool bot
      return NextResponse.json({ 
        success: true, 
        message: "We have received your itinerary request. One of our local Kashmir adventure coordinators will review it and respond with a custom draft itinerary within 24 hours." 
      });
    }

    // 2. Server-side Validation
    if (!name || name.trim() === '') {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'A valid email address is required' }, { status: 400 });
    }
    if (!phone || phone.trim() === '') {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }

    // 3. Save to database using Prisma
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        destination: destination ? destination.trim() : null,
        date: date ? date.trim() : null,
        guests: guests ? String(guests).trim() : null,
        notes: notes ? notes.trim() : null,
        formType: 'itinerary',
      },
    });

    // 4. Return success state
    return NextResponse.json({
      success: true,
      message: "We have received your itinerary request. One of our local Kashmir adventure coordinators will review it and respond with a custom draft itinerary within 24 hours.",
      leadId: lead.id
    });

  } catch (error: any) {
    console.error('Error handling lead submission:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
