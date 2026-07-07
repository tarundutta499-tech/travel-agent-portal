import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbDestinations = await prisma.destination.findMany({
      where: { active: true },
      include: {
        stops: {
          include: {
            hotels: true,
          },
          orderBy: { sequenceOrder: 'asc' },
        },
        itineraryTemplates: {
          orderBy: { durationDays: 'asc' },
        },
      },
    });

    // Map database models to client structure
    const destinations = dbDestinations.map(d => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      description: d.description,
      heroImage: d.heroImage,
      stops: d.stops.map(s => ({
        id: s.id,
        locationName: s.locationName,
        sequenceOrder: s.sequenceOrder,
        defaultNights: s.defaultNights,
        description: s.description,
        touristImage: s.touristImage,
        touristPlaceName: s.touristPlaceName,
        hotels: s.hotels.map(h => ({
          id: h.id,
          name: h.name,
          starRating: h.starRating,
          isConfirmed: h.isConfirmed,
          image: h.image,
          notes: h.notes,
        })),
      })),
      itineraryTemplates: d.itineraryTemplates.map(t => {
        let itinerary = [];
        try {
          itinerary = JSON.parse(t.itineraryJson);
        } catch (e) {
          console.error('Failed to parse itineraryJson for template:', t.id, e);
        }
        return {
          id: t.id,
          durationDays: t.durationDays,
          title: t.title,
          price: t.price,
          difficulty: t.difficulty,
          image: t.image,
          included: t.included,
          excluded: t.excluded,
          itinerary,
        };
      }),
    }));

    return NextResponse.json({ success: true, destinations });

  } catch (error: any) {
    console.error('Error fetching public destinations & templates:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
