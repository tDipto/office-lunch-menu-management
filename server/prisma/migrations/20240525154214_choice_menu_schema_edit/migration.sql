/*
  Warnings:

  - You are about to drop the column `options` on the `Choice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Choice" DROP COLUMN "options",
ADD COLUMN     "choices" TEXT[];
