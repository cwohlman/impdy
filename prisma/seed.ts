import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "joshua@ohlman.io";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("justtesting", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  var cardOne = await prisma.card.create({
    data: {
      content: "Create IPMDY project",
      userId: user.id,
      authorId: user.id,
    },
  });
  var cardTwo = await prisma.card.create({
    data: {
      content: "Show IMPDY to Laura",
      userId: user.id,
      authorId: user.id,
    }
  })

  await prisma.card.create({
    data: {
      parentId: cardOne.id,
      content: "Get v1 working",
      userId: user.id,
      authorId: user.id,
    }
  })
  const task1 = await prisma.card.create({
    data: {
      parentId: cardOne.id,
      content: "Initial working list",
      userId: user.id,
      authorId: user.id,
    }
  })
  await prisma.card.create({
    data: {
      parentId: task1.id,
      content: "Done!",
      userId: user.id,
      authorId: user.id,
      resolves: {
        connect: {
          id: task1.id
        }
      }
    }
  })

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
