import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.performance.deleteMany();
  await prisma.player.deleteMany();
  await prisma.reaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.checkin.deleteMany();
  await prisma.game.deleteMany();
  await prisma.favoriteTeam.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.stadium.deleteMany();
  await prisma.team.deleteMany();
  await prisma.settings.deleteMany();
  await prisma.user.deleteMany();

  // Create MLB Teams
  console.log('🏟️ Creating MLB teams...');
  const yankees = await prisma.team.create({
    data: {
      league: 'MLB',
      name: 'Yankees',
      city: 'New York',
      abbrev: 'NYY',
    },
  });

  const mets = await prisma.team.create({
    data: {
      league: 'MLB',
      name: 'Mets',
      city: 'New York',
      abbrev: 'NYM',
    },
  });

  const redSox = await prisma.team.create({
    data: {
      league: 'MLB',
      name: 'Red Sox',
      city: 'Boston',
      abbrev: 'BOS',
    },
  });

  const dodgers = await prisma.team.create({
    data: {
      league: 'MLB',
      name: 'Dodgers',
      city: 'Los Angeles',
      abbrev: 'LAD',
    },
  });

  // Create Stadiums
  console.log('🏟️ Creating stadiums...');
  const yankeeStadium = await prisma.stadium.create({
    data: {
      name: 'Yankee Stadium',
      teamId: yankees.id,
      city: 'New York',
      lat: 40.8296,
      lng: -73.9262,
    },
  });

  const citiField = await prisma.stadium.create({
    data: {
      name: 'Citi Field',
      teamId: mets.id,
      city: 'New York',
      lat: 40.7561,
      lng: -73.8458,
    },
  });

  const fenwayPark = await prisma.stadium.create({
    data: {
      name: 'Fenway Park',
      teamId: redSox.id,
      city: 'Boston',
      lat: 42.3467,
      lng: -71.0972,
    },
  });

  const dodgerStadium = await prisma.stadium.create({
    data: {
      name: 'Dodger Stadium',
      teamId: dodgers.id,
      city: 'Los Angeles',
      lat: 34.0739,
      lng: -118.2400,
    },
  });

  // Create Games
  console.log('⚾ Creating games...');
  const game1 = await prisma.game.create({
    data: {
      league: 'MLB',
      dateUTC: new Date('2024-10-15T19:00:00Z'), // Yankees vs Red Sox
      homeTeamId: yankees.id,
      awayTeamId: redSox.id,
      stadiumId: yankeeStadium.id,
      finalHomeScore: 5,
      finalAwayScore: 3,
      status: 'FINAL',
    },
  });

  const game2 = await prisma.game.create({
    data: {
      league: 'MLB',
      dateUTC: new Date('2024-10-20T20:00:00Z'), // Mets vs Dodgers
      homeTeamId: mets.id,
      awayTeamId: dodgers.id,
      stadiumId: citiField.id,
      finalHomeScore: 2,
      finalAwayScore: 7,
      status: 'FINAL',
    },
  });

  const game3 = await prisma.game.create({
    data: {
      league: 'MLB',
      dateUTC: new Date('2024-11-01T19:00:00Z'), // Future game
      homeTeamId: yankees.id,
      awayTeamId: mets.id,
      stadiumId: yankeeStadium.id,
      status: 'SCHEDULED',
    },
  });

  // Create Demo Users
  console.log('👥 Creating demo users...');
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      name: 'John Smith',
      locationCity: 'New York',
      locationLat: 40.7128,
      locationLng: -74.0060,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'sarah@example.com',
      name: 'Sarah Johnson',
      locationCity: 'Boston',
      locationLat: 42.3601,
      locationLng: -71.0589,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'mike@example.com',
      name: 'Mike Davis',
      locationCity: 'Los Angeles',
      locationLat: 34.0522,
      locationLng: -118.2437,
    },
  });

  // Create Favorite Teams
  console.log('⭐ Creating favorite teams...');
  await prisma.favoriteTeam.createMany({
    data: [
      { userId: user1.id, teamId: yankees.id },
      { userId: user1.id, teamId: mets.id },
      { userId: user2.id, teamId: redSox.id },
      { userId: user3.id, teamId: dodgers.id },
    ],
  });

  // Create Follows
  console.log('👥 Creating follows...');
  await prisma.follow.createMany({
    data: [
      { followerId: user1.id, followeeId: user2.id },
      { followerId: user2.id, followeeId: user1.id },
      { followerId: user1.id, followeeId: user3.id },
    ],
  });

  // Create Checkins
  console.log('🎫 Creating checkins...');
  const checkin1 = await prisma.checkin.create({
    data: {
      userId: user1.id,
      gameId: game1.id,
      method: 'TICKET',
      verified: true,
      seatText: 'Section 105, Row 15, Seat 8',
      ticketImageUrl: '/uploads/ticket1.jpg',
    },
  });

  const checkin2 = await prisma.checkin.create({
    data: {
      userId: user2.id,
      gameId: game1.id,
      method: 'MANUAL',
      verified: false,
      seatText: 'Section 203, Row 10, Seat 12',
    },
  });

  const checkin3 = await prisma.checkin.create({
    data: {
      userId: user3.id,
      gameId: game2.id,
      method: 'TICKET',
      verified: true,
      seatText: 'Section 101, Row 5, Seat 3',
      ticketImageUrl: '/uploads/ticket2.jpg',
    },
  });

  // Create Posts
  console.log('📝 Creating posts...');
  const post1 = await prisma.post.create({
    data: {
      userId: user1.id,
      gameId: game1.id,
      caption: 'Amazing game at Yankee Stadium! The energy was incredible! #Yankees #RedSox #Baseball',
      mediaUrls: ['/uploads/game1_photo1.jpg', '/uploads/game1_photo2.jpg'],
    },
  });

  const post2 = await prisma.post.create({
    data: {
      userId: user2.id,
      gameId: game1.id,
      caption: 'Great rivalry game! Even though we lost, it was a fantastic experience. #RedSox #Yankees',
      mediaUrls: ['/uploads/game1_photo3.jpg'],
    },
  });

  const post3 = await prisma.post.create({
    data: {
      userId: user3.id,
      gameId: game2.id,
      caption: 'Dodgers on fire tonight! What a performance! #Dodgers #Mets #LA',
      mediaUrls: ['/uploads/game2_photo1.jpg'],
    },
  });

  // Create Comments
  console.log('💬 Creating comments...');
  await prisma.comment.createMany({
    data: [
      { postId: post1.id, userId: user2.id, body: 'Great photos! Wish I could have been there!' },
      { postId: post1.id, userId: user3.id, body: 'Looks amazing! Yankee Stadium is on my bucket list.' },
      { postId: post2.id, userId: user1.id, body: 'Great game! The rivalry never disappoints.' },
      { postId: post3.id, userId: user1.id, body: 'Dodgers are looking strong this season!' },
    ],
  });

  // Create Reactions
  console.log('❤️ Creating reactions...');
  await prisma.reaction.createMany({
    data: [
      { postId: post1.id, userId: user2.id, type: 'LIKE' },
      { postId: post1.id, userId: user3.id, type: 'LIKE' },
      { postId: post2.id, userId: user1.id, type: 'LIKE' },
      { postId: post3.id, userId: user1.id, type: 'LIKE' },
      { postId: post3.id, userId: user2.id, type: 'FIRE' },
    ],
  });

  // Create Badges
  console.log('🏆 Creating badges...');
  const firstGameBadge = await prisma.badge.create({
    data: {
      slug: 'first-game',
      name: 'First Game',
      rarity: 'SILVER',
    },
  });

  const yankeeFanBadge = await prisma.badge.create({
    data: {
      slug: 'yankee-fan',
      name: 'Yankee Fan',
      rarity: 'GOLD',
    },
  });

  const stadiumCollectorBadge = await prisma.badge.create({
    data: {
      slug: 'stadium-collector',
      name: 'Stadium Collector',
      rarity: 'PLATINUM',
    },
  });

  // Award Badges
  console.log('🏅 Awarding badges...');
  await prisma.userBadge.createMany({
    data: [
      { userId: user1.id, badgeId: firstGameBadge.id, reason: 'Attended first MLB game' },
      { userId: user1.id, badgeId: yankeeFanBadge.id, reason: 'Attended Yankees home game' },
      { userId: user2.id, badgeId: firstGameBadge.id, reason: 'Attended first MLB game' },
      { userId: user3.id, badgeId: firstGameBadge.id, reason: 'Attended first MLB game' },
    ],
  });

  // Create Settings
  console.log('⚙️ Creating user settings...');
  await prisma.settings.createMany({
    data: [
      { userId: user1.id, shareAutoImage: true },
      { userId: user2.id, shareAutoImage: false },
      { userId: user3.id, shareAutoImage: true },
    ],
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${await prisma.team.count()} teams`);
  console.log(`Created ${await prisma.stadium.count()} stadiums`);
  console.log(`Created ${await prisma.game.count()} games`);
  console.log(`Created ${await prisma.user.count()} users`);
  console.log(`Created ${await prisma.checkin.count()} checkins`);
  console.log(`Created ${await prisma.post.count()} posts`);
  console.log(`Created ${await prisma.badge.count()} badges`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
