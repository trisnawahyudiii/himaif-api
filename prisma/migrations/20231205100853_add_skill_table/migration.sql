/*
  Warnings:

  - You are about to drop the column `skill` on the `pendaftaran_himpunans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pendaftaran_himpunans` DROP COLUMN `skill`;

-- CreateTable
CREATE TABLE `skill_pendaftaran_himpunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publicSpeaking` BOOLEAN NOT NULL DEFAULT false,
    `modernDance` BOOLEAN NOT NULL DEFAULT false,
    `tariTraditional` BOOLEAN NOT NULL DEFAULT false,
    `alatMusik` BOOLEAN NOT NULL DEFAULT false,
    `menyanyi` BOOLEAN NOT NULL DEFAULT false,
    `fotografi` BOOLEAN NOT NULL DEFAULT false,
    `videografi` BOOLEAN NOT NULL DEFAULT false,
    `design` BOOLEAN NOT NULL DEFAULT false,
    `buluTangkis` BOOLEAN NOT NULL DEFAULT false,
    `futsal` BOOLEAN NOT NULL DEFAULT false,
    `catur` BOOLEAN NOT NULL DEFAULT false,
    `pubg` BOOLEAN NOT NULL DEFAULT false,
    `valorant` BOOLEAN NOT NULL DEFAULT false,
    `mobileLegend` BOOLEAN NOT NULL DEFAULT false,
    `other` VARCHAR(191) NULL,
    `pendaftaranHimpunanId` INTEGER NOT NULL,

    UNIQUE INDEX `skill_pendaftaran_himpunan_id_key`(`id`),
    UNIQUE INDEX `skill_pendaftaran_himpunan_pendaftaranHimpunanId_key`(`pendaftaranHimpunanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `skill_pendaftaran_himpunan` ADD CONSTRAINT `skill_pendaftaran_himpunan_pendaftaranHimpunanId_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
