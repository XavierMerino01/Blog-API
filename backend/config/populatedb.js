const prisma = require('./prisma');
const bcrypt = require('bcryptjs');

async function main() {
  const hashedPassword = await bcrypt.hash('123', 10);

  const user = await prisma.user.update({
    where: { email: 'merinoxevi@gmail.com' },
    data: {
      hashedPassword: hashedPassword,
    },
  });

  console.log('Updated user password:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

