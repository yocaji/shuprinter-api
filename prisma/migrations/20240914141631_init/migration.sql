-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "noteKey" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
