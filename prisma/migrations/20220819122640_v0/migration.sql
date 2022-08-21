/*
  Warnings:

  - You are about to drop the column `nickName` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nickname" TEXT;

-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "nickName";

-- DropTable
DROP TABLE "Task";
