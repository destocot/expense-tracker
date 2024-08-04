const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.securityQuestion.createMany({
    data: [
      { question: "What was the name of your first pet?" },
      { question: "What is the name of the street you grew up on?" },
      { question: "What is your mother’s maiden name?" },
      { question: "What was the make and model of your first car?" },
      { question: "What was the name of your elementary school?" },
      { question: "In what city were you born?" },
      { question: "What is the name of your favorite childhood friend?" },
      { question: "What is your favorite book?" },
      { question: "What is the name of the hospital where you were born?" },
      { question: "What is your favorite movie?" },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
