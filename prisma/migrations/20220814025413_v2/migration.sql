-- CreateTable
CREATE TABLE "NotionInfo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notionKey" TEXT,
    "notion_database_id" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "NotionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotionInfo_userId_key" ON "NotionInfo"("userId");

-- AddForeignKey
ALTER TABLE "NotionInfo" ADD CONSTRAINT "NotionInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
