import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all packages for management
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      include: {
        itinerary: true,
        guide: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, packages });
  } catch (error: any) {
    console.error('Error fetching admin packages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch packages' }, { status: 500 });
  }
}

// POST create a new package
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, description, destination, price, duration, difficulty, groupSizeMax, image, category, guideName } = body;

    if (!title || !slug || !price || !destination) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Find or create guide
    let guide = null;
    if (guideName) {
      guide = await prisma.guide.findFirst({ where: { name: guideName } });
      if (!guide) {
        guide = await prisma.guide.create({
          data: {
            name: guideName,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${guideName}`,
            rating: 5.0,
            experience: '5 Years',
            bio: `Certified local mountain guide specialized in ${destination} tours.`,
          },
        });
      }
    }

    const newPkg = await prisma.package.create({
      data: {
        title,
        slug,
        description: description || '',
        destination,
        price: parseFloat(price),
        duration: duration || '5 Days',
        difficulty: difficulty || 'Moderate',
        groupSizeMax: parseInt(groupSizeMax) || 10,
        image: image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        images: [image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'],
        category: category || 'Cultural',
        guideId: guide ? guide.id : null,
        included: ['Local transport', 'Guiding fees', 'Accommodation'],
        excluded: ['Personal expenses', 'Flights'],
      },
    });

    return NextResponse.json({ success: true, package: newPkg });

  } catch (error: any) {
    console.error('Error creating package:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create package' }, { status: 500 });
  }
}

// PUT update an existing package
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, price, description, active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing package ID' }, { status: 400 });
    }

    const updated = await prisma.package.update({
      where: { id },
      data: {
        price: price !== undefined ? parseFloat(price) : undefined,
        description: description !== undefined ? description : undefined,
        active: active !== undefined ? active : undefined,
      },
    });

    return NextResponse.json({ success: true, package: updated });

  } catch (error: any) {
    console.error('Error updating package:', error);
    return NextResponse.json({ success: false, error: 'Failed to update package' }, { status: 500 });
  }
}
