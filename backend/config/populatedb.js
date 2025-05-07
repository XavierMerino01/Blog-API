const prisma = require('./prisma');

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Xavier',
      email: 'merinoxevi@gmail.com',
      hashedPassword: '123',
    },
  });

  console.log('Created user:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

