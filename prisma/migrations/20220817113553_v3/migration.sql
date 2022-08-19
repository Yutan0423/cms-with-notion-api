/*
  Warnings:

  - You are about to drop the column `nickName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `NotionInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotionInfo" DROP CONSTRAINT "NotionInfo_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "nickName";

-- DropTable
DROP TABLE "NotionInfo";

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nickName" TEXT NOT NULL,
    "notionKey" TEXT NOT NULL,
    "notionDatabaseId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
