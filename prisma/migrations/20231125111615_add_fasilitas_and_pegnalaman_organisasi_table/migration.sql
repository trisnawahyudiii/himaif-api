/*
  Warnings:

  - Added the required column `pendaftaranHimpunanId` to the `pengalaman_organisasi_himpunans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pendaftaran_himpunans` ADD COLUMN `bersediaDipindahkan` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `pengalaman_organisasi_himpunans` ADD COLUMN `pendaftaranHimpunanId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `FasilitasYangDimilikiPendaftaranHimpunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motor` BOOLEAN NOT NULL DEFAULT false,
    `mobil` BOOLEAN NOT NULL DEFAULT false,
    `handphone` BOOLEAN NOT NULL DEFAULT false,
    `laptop` BOOLEAN NOT NULL DEFAULT false,
    `handycam` BOOLEAN NOT NULL DEFAULT false,
    `camera` BOOLEAN NOT NULL DEFAULT false,
    `other` VARCHAR(191) NULL,
    `pendaftaranHimpunanId` INTEGER NOT NULL,

    UNIQUE INDEX `FasilitasYangDimilikiPendaftaranHimpunan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pengalaman_organisasi_himpunans` ADD CONSTRAINT `pengalaman_organisasi_himpunans_pendaftaranHimpunanId_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FasilitasYangDimilikiPendaftaranHimpunan` ADD CONSTRAINT `FasilitasYangDimilikiPendaftaranHimpunan_pendaftaranHimpuna_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
