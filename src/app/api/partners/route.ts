import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, partnershipType, message, website_confirm } = body;

    // 1. Basic Honeypot Spam Protection
    if (website_confirm && website_confirm.trim() !== '') {
      // Silently discard spam but return success code to fool bot
      return NextResponse.json({ 
        success: true, 
        message: "Thank you! Our partner relations team will review your application and coordinate with you shortly." 
      });
    }

    // 2. Server-side Validation
    if (!name || name.trim() === '') {
      return NextResponse.json({ success: false, error: 'Contact Name is required' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'A valid email address is required' }, { status: 400 });
    }
    if (!phone || phone.trim() === '') {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }
    if (!partnershipType || partnershipType.trim() === '') {
      return NextResponse.json({ success: false, error: 'Partnership Type is required' }, { status: 400 });
    }

    // 3. Save to database using Prisma
    const app = await prisma.partnerApplication.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        companyName: companyName ? companyName.trim() : null,
        partnershipType: partnershipType.trim(),
        message: message ? message.trim() : null,
      },
    });

    // 4. Return success state
    return NextResponse.json({
      success: true,
      message: "Thank you! Our partner relations team will review your application and coordinate with you shortly.",
      applicationId: app.id
    });

  } catch (error: any) {
    console.error('Error handling partner application submission:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
