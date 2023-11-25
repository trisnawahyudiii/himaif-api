/*
  Warnings:

  - Added the required column `himpunanId` to the `divisies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `divisies` ADD COLUMN `himpunanId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `divisies` ADD CONSTRAINT `divisies_himpunanId_fkey` FOREIGN KEY (`himpunanId`) REFERENCES `himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
