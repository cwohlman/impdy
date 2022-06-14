-- CreateTable
CREATE TABLE "CardShare" (
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("cardId", "userId"),
    CONSTRAINT "CardShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CardShare_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
