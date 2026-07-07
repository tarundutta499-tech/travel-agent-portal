import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // 1. Clear existing database tables
    await prisma.hotel.deleteMany({});
    await prisma.itineraryTemplate.deleteMany({});
    await prisma.stop.deleteMany({});
    await prisma.destination.deleteMany({});

    // 2. Create the primary Destination: Kashmir
    const dest = await prisma.destination.create({
      data: {
        name: 'Kashmir',
        slug: 'kashmir',
        description: 'Experience Srinagar floating lake markets, Gulmarg powder bowls, Pahalgam river meadows, and Sonamarg glacier routes.',
        heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600',
        active: true,
      },
    });

    // 3. Create Intermediate Stops
    const stopSrinagar = await prisma.stop.create({
      data: {
        destinationId: dest.id,
        locationName: 'Srinagar',
        sequenceOrder: 1,
        defaultNights: 2,
        description: 'Ancient capital of houseboats, Mughal pleasure gardens, and floating flower markets.',
        touristPlaceName: 'Dal Lake & Mughal Heritage Gardens',
        touristImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      },
    });

    const stopGulmarg = await prisma.stop.create({
      data: {
        destinationId: dest.id,
        locationName: 'Gulmarg',
        sequenceOrder: 2,
        defaultNights: 1,
        description: 'High altitude mountain bowl valley famous for backcountry skiing Gondolas.',
        touristPlaceName: 'Mt. Apharwat Peak Gondola',
        touristImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
      },
    });

    const stopPahalgam = await prisma.stop.create({
      data: {
        destinationId: dest.id,
        locationName: 'Pahalgam',
        sequenceOrder: 3,
        defaultNights: 1,
        description: 'Lidder river valley with nomadic shepherd meadow routes.',
        touristPlaceName: 'Betaab Valley & Aru Meadows',
        touristImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      },
    });

    const stopSonamarg = await prisma.stop.create({
      data: {
        destinationId: dest.id,
        locationName: 'Sonamarg',
        sequenceOrder: 4,
        defaultNights: 1,
        description: 'The Golden Meadow at the base of pristine glaciers and frozen passes.',
        touristPlaceName: 'Thajiwas Glacier Trekking Route',
        touristImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      },
    });

    // 4. Create Confirmed Hotel for Srinagar Stop ONLY
    await prisma.hotel.create({
      data: {
        stopId: stopSrinagar.id,
        name: 'Kashmir Holiday Inn',
        starRating: 4.5,
        isConfirmed: true,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        notes: 'Includes premium double deluxe rooms, complementary Kehwa tea reception, and traditional Wazwan dinners.',
      },
    });

    // Note: No hotel rows are created for Gulmarg, Pahalgam, or Sonamarg
    // representing "Partner hotel coming soon" state.

    // 5. Create Itinerary Templates
    const itinerary3Days = [
      {
        day: 1,
        stopName: 'Srinagar',
        title: 'Arrival in Srinagar & Dal Lake Shikara',
        description: 'Arrive at Srinagar airport. Check-in at the partner hotel (Kashmir Holiday Inn). Enjoy sunset Shikara boat cruise on Dal Lake.',
        activities: ['Airport pickup', 'Kehwa welcome', 'Dal Lake Shikara ride']
      },
      {
        day: 2,
        stopName: 'Gulmarg',
        title: 'Gulmarg Gondola Mountain Tour',
        description: 'Take a scenic day trip to Gulmarg. Ride Gondola Phase I and walk along the pine forest clearings. Return to Srinagar for overnight stay.',
        activities: ['Scenic valley transfer', 'Mt Apharwat gondola', 'Pine forest walks']
      },
      {
        day: 3,
        stopName: 'Srinagar',
        title: 'Mughal Gardens Heritage Walk & Departure',
        description: 'Tour the royal Shalimar and Nishat Mughal gardens before transferring to Srinagar Airport for departure.',
        activities: ['Mughal gardens tour', 'Airport drop-off']
      }
    ];

    const itinerary5Days = [
      {
        day: 1,
        stopName: 'Srinagar',
        title: 'Arrival & Floating Lake Market Cruise',
        description: 'Arrive in Srinagar and check-in at Kashmir Holiday Inn. Take a sunset Shikara cruise to explore floating craft shops.',
        activities: ['Airport pickup', 'Shikara ride', 'Kehwa welcoming']
      },
      {
        day: 2,
        stopName: 'Gulmarg',
        title: 'Gulmarg Snow Slopes & Gondola Phase I Ride',
        description: 'Day excursion to Gulmarg. Settle in for ski slopes sightseeing, ride the Gondola, and walk through snow pine forests.',
        activities: ['Gondola cable car', 'Backcountry walking']
      },
      {
        day: 3,
        stopName: 'Pahalgam',
        title: 'Transfer to Pahalgam & Lidder River Hike',
        description: 'Drive along the gushing Sindh and Lidder rivers to Pahalgam. Enjoy a scenic trail walk on the riverbanks.',
        activities: ['Scenic mountain drive', 'Lidder river walk']
      },
      {
        day: 4,
        stopName: 'Pahalgam',
        title: 'Aru Valley Meadow Trail & Shepherd Camp Visit',
        description: 'horseback ride through pine woods to Aru Valley high-altitude meadows.Savor a mountain stream picnic.',
        activities: ['Aru meadow horse ride', 'Nomad camp visit', 'Riverside picnic']
      },
      {
        day: 5,
        stopName: 'Srinagar',
        title: 'Mughal Heritage Walk & Airport Drop-off',
        description: 'Return to Srinagar for a quick tour of Shalimar Bagh gardens before heading to the airport.',
        activities: ['Shalimar garden tour', 'Airport transfer']
      }
    ];

    const itinerary7Days = [
      {
        day: 1,
        stopName: 'Srinagar',
        title: 'Arrival in Srinagar & Dal Lake check-in',
        description: 'Arrive at Srinagar airport. Check-in at the partner hotel (Kashmir Holiday Inn). Settle in and enjoy local Kehwa tea.',
        activities: ['Airport pickup', 'Kehwa tea reception']
      },
      {
        day: 2,
        stopName: 'Gulmarg',
        title: 'Gulmarg Backcountry Powder Bowls - Gondola Phase II',
        description: 'Drive to Gulmarg. Ride the Gondola Phase II up to 3,979m on Mt Apharwat with local safety guides.',
        activities: ['Backcountry ski bowls', 'Apharwat Gondola Phase II']
      },
      {
        day: 3,
        stopName: 'Gulmarg',
        title: 'Pine Forest Ski Trails & Return to Srinagar',
        description: 'Explore lower skiing trails and snow pine meadows. Return to Srinagar for dinner.',
        activities: ['Snow forest trail hike', 'Wazwan dinner reception']
      },
      {
        day: 4,
        stopName: 'Pahalgam',
        title: 'Betaab & Aru Valley Meadows Ride',
        description: 'Drive to Pahalgam. Settle in near Lidder River. Horseback ride through Pahalgam valley clearings.',
        activities: ['Betaab valley tour', 'Pahalgam horse trail']
      },
      {
        day: 5,
        stopName: 'Sonamarg',
        title: 'Sindh River Drive to Sonamarg Gold Meadows',
        description: 'Drive along the gushing Sindh river to Sonamarg. Settle in by the riverside.',
        activities: ['Sindh river drive', 'Alpine camp setup']
      },
      {
        day: 6,
        stopName: 'Sonamarg',
        title: 'Ascent Day: Thajiwas Glacier Hike',
        description: 'Hike 4km uphill to the foot of Thajiwas Glacier. Walk on raw glacier snow slabs.',
        activities: ['Thajiwas Glacier trek', 'Glacial stream trail']
      },
      {
        day: 7,
        stopName: 'Srinagar',
        title: 'Heritage Gardens & Airport Departure',
        description: 'Visit royal Nishat Bagh before airport drop-off.',
        activities: ['Nishat Bagh tour', 'Airport transfer']
      }
    ];

    await prisma.itineraryTemplate.create({
      data: {
        destinationId: dest.id,
        durationDays: 3,
        title: '3-Day Express Escape',
        price: 15000,
        difficulty: 'Easy',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        included: ['Airport transfers & local transport', 'Shikara cruise on Dal Lake', 'All breakfast & dinner meals', 'Certified local host'],
        excluded: ['Flight tickets', 'Lunches', 'Tips & personal shopping'],
        itineraryJson: JSON.stringify(itinerary3Days),
      },
    });

    await prisma.itineraryTemplate.create({
      data: {
        destinationId: dest.id,
        durationDays: 5,
        title: '5-Day Classic Valley Tour',
        price: 25000,
        difficulty: 'Moderate',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        included: ['Private tourist vehicles for all transfers', 'Gondola Phase I lift tickets', 'Srinagar & Pahalgam cottage lodging', 'Daily breakfast & dinner'],
        excluded: ['Flight tickets', 'Trekking equipment', 'Pony ride fees', 'Lunch'],
        itineraryJson: JSON.stringify(itinerary5Days),
      },
    });

    await prisma.itineraryTemplate.create({
      data: {
        destinationId: dest.id,
        durationDays: 7,
        title: '7-Day Grand Expedition',
        price: 42000,
        difficulty: 'Hard',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
        included: ['All overland transfers in premium SUVs', 'Thajiwas Glacier guides & ponies', 'Gondola Phase I & II passes', 'All meals (Breakfast, Lunch, Dinner)', 'Alpine rescue safety insurance'],
        excluded: ['Flights', 'Handicraft purchases', 'Alcoholic beverages'],
        itineraryJson: JSON.stringify(itinerary7Days),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database successfully seeded with new stops and dynamic itinerary templates!',
    });

  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
