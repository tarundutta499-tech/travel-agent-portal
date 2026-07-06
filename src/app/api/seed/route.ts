import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { mockPackages, mockDestinations } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    // 1. Clear existing data to prevent duplicate keys
    await prisma.itineraryDay.deleteMany({});
    await prisma.package.deleteMany({});
    await prisma.guide.deleteMany({});
    await prisma.destination.deleteMany({});

    // 2. Seed Destinations
    for (const dest of mockDestinations) {
      await prisma.destination.create({
        data: {
          name: dest.name,
          slug: dest.slug,
          image: dest.image,
          desc: dest.desc,
          count: dest.count,
        },
      });
    }

    // 3. Seed Guides and Packages
    for (const pkg of mockPackages) {
      // First create or find the guide
      let guide = await prisma.guide.findFirst({
        where: { name: pkg.guide.name },
      });

      if (!guide) {
        guide = await prisma.guide.create({
          data: {
            name: pkg.guide.name,
            avatar: pkg.guide.avatar,
            rating: pkg.guide.rating,
            experience: pkg.guide.experience,
            bio: pkg.guide.bio,
          },
        });
      }

      // Create the package
      const createdPkg = await prisma.package.create({
        data: {
          title: pkg.title,
          slug: pkg.slug,
          description: pkg.description,
          destination: pkg.destination,
          price: pkg.price,
          duration: pkg.duration,
          difficulty: pkg.difficulty,
          groupSizeMax: pkg.groupSizeMax,
          image: pkg.image,
          images: pkg.images,
          category: pkg.category,
          rating: pkg.rating,
          reviewsCount: pkg.reviewsCount,
          guideId: guide.id,
          included: pkg.included,
          excluded: pkg.excluded,
        },
      });

      // Create itinerary days
      for (const day of pkg.itinerary) {
        await prisma.itineraryDay.create({
          data: {
            packageId: createdPkg.id,
            day: day.day,
            title: day.title,
            description: day.description,
            activities: day.activities,
          },
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Database successfully seeded with Kashmir packages, destinations, and local guides!' });

  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
