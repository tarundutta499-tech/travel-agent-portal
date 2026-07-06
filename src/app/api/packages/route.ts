import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { mockPackages } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbPackages = await prisma.package.findMany({
      where: { active: true },
      include: {
        itinerary: true,
        guide: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // If database has packages, return them; otherwise, fallback to mock data
    if (dbPackages && dbPackages.length > 0) {
      // Map database schema slightly if needed to match client expectations
      const mapped = dbPackages.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        destination: p.destination,
        price: p.price,
        duration: p.duration,
        difficulty: p.difficulty as 'Easy' | 'Moderate' | 'Hard',
        groupSizeMax: p.groupSizeMax,
        image: p.image,
        images: p.images,
        category: p.category,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        included: p.included,
        excluded: p.excluded,
        itinerary: p.itinerary.map(d => ({
          day: d.day,
          title: d.title,
          description: d.description,
          activities: d.activities,
        })),
        guide: p.guide ? {
          name: p.guide.name,
          avatar: p.guide.avatar,
          rating: p.guide.rating,
          experience: p.guide.experience,
          bio: p.guide.bio,
        } : {
          name: 'Local Specialist Guide',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=local',
          rating: 4.9,
          experience: '5 Years',
          bio: 'Certified local mountaineer with extensive rescue response training.',
        }
      }));
      return NextResponse.json({ success: true, packages: mapped });
    }

    return NextResponse.json({ success: true, packages: mockPackages });

  } catch (error: any) {
    console.error('Error fetching public packages:', error);
    // Graceful fallback to mock data to prevent server crashes
    return NextResponse.json({ success: true, packages: mockPackages });
  }
}
