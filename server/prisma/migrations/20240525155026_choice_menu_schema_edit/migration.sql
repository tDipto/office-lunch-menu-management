/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,menuId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Choice_employeeId_menuId_key" ON "Choice"("employeeId", "menuId");
