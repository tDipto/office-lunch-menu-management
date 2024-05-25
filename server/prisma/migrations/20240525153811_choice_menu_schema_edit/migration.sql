/*
  Warnings:

  - You are about to drop the column `option` on the `Choice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "option",
ADD COLUMN     "options" TEXT[];
