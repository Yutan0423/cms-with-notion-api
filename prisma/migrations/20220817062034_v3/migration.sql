/*
  Warnings:

  - You are about to drop the column `notion_database_id` on the `NotionInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NotionInfo" DROP COLUMN "notion_database_id",
ADD COLUMN     "notionDatabaseId" TEXT;
