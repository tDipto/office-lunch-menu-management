-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Choice" DROP CONSTRAINT "Choice_menuId_fkey";

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
