/*
  Warnings:

  - Added the required column `tempatTanggalLahir` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `penyakitKhusus` VARCHAR(191) NULL,
    ADD COLUMN `tempatTanggalLahir` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `himpunans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `himpunans_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `divisies_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobdesc_divisies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `divisiId` INTEGER NOT NULL,

    UNIQUE INDEX `jobdesc_divisies_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pendaftaran_himpunans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pendaftaran_himpunan_user_id` INTEGER NOT NULL,
    `himpunanId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `pendaftaran_himpunans_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisi_pilihans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pendaftaranHimpunanId` INTEGER NOT NULL,
    `divisiId` INTEGER NOT NULL,
    `alasan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `divisi_pilihans_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengalaman_organisasi_himpunans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `tahun` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pengalaman_organisasi_himpunans_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jobdesc_divisies` ADD CONSTRAINT `jobdesc_divisies_divisiId_fkey` FOREIGN KEY (`divisiId`) REFERENCES `divisies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftaran_himpunans` ADD CONSTRAINT `pendaftaran_himpunans_pendaftaran_himpunan_user_id_fkey` FOREIGN KEY (`pendaftaran_himpunan_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftaran_himpunans` ADD CONSTRAINT `pendaftaran_himpunans_himpunanId_fkey` FOREIGN KEY (`himpunanId`) REFERENCES `himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisi_pilihans` ADD CONSTRAINT `divisi_pilihans_pendaftaranHimpunanId_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisi_pilihans` ADD CONSTRAINT `divisi_pilihans_divisiId_fkey` FOREIGN KEY (`divisiId`) REFERENCES `divisies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
