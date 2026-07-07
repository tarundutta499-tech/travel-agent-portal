import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all itinerary templates for admin dashboard
export async function GET() {
  try {
    const templates = await prisma.itineraryTemplate.findMany({
      include: {
        destination: true,
      },
      orderBy: { durationDays: 'asc' },
    });
    return NextResponse.json({ success: true, packages: templates });
  } catch (error: any) {
    console.error('Error fetching admin templates:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch templates' }, { status: 500 });
  }
}

// POST create a template (stub for compiler safety)
export async function POST(request: Request) {
  try {
    return NextResponse.json({ success: true, message: 'Admin edits are locked during data model updates.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT update template status (stub for compiler safety)
export async function PUT(request: Request) {
  try {
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
