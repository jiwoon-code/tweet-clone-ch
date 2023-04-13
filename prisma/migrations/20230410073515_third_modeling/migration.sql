/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tweet` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tweet_userId_idx";

-- DropIndex
DROP INDEX "Tweet_postId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tweet";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "tweet" TEXT NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_userId_idx" ON "Post"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
