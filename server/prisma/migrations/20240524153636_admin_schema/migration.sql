-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verifyAdmin" TEXT NOT NULL DEFAULT 'no',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
