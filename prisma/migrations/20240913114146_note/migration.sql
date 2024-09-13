/*
  Warnings:

  - You are about to drop the `Sprint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sprint";

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT,
    "key" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
