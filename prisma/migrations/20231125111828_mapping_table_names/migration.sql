/*
  Warnings:

  - You are about to drop the `fasilitasyangdimilikipendaftaranhimpunan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fasilitasyangdimilikipendaftaranhimpunan` DROP FOREIGN KEY `FasilitasYangDimilikiPendaftaranHimpunan_pendaftaranHimpuna_fkey`;

-- DropTable
DROP TABLE `fasilitasyangdimilikipendaftaranhimpunan`;

-- CreateTable
CREATE TABLE `fasilitas_yang_dimiliki_pendaftaran_himpunan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motor` BOOLEAN NOT NULL DEFAULT false,
    `mobil` BOOLEAN NOT NULL DEFAULT false,
    `handphone` BOOLEAN NOT NULL DEFAULT false,
    `laptop` BOOLEAN NOT NULL DEFAULT false,
    `handycam` BOOLEAN NOT NULL DEFAULT false,
    `camera` BOOLEAN NOT NULL DEFAULT false,
    `other` VARCHAR(191) NULL,
    `pendaftaranHimpunanId` INTEGER NOT NULL,

    UNIQUE INDEX `fasilitas_yang_dimiliki_pendaftaran_himpunan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fasilitas_yang_dimiliki_pendaftaran_himpunan` ADD CONSTRAINT `fasilitas_yang_dimiliki_pendaftaran_himpunan_pendaftaranHim_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
