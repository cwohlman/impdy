/*
  Warnings:

  - Added the required column `input` to the `Flag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keyword" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "Flag_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Flag" ("cardId", "id", "keyword") SELECT "cardId", "id", "keyword" FROM "Flag";
DROP TABLE "Flag";
ALTER TABLE "new_Flag" RENAME TO "Flag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
