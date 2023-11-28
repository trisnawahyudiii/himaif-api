-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `gender` ENUM('LAKI_LAKI', 'PEREMPUAN') NOT NULL,
    `tempatTanggalLahir` VARCHAR(191) NULL,
    `penyakitKhusus` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `nickName` VARCHAR(191) NULL,
    `agama` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `idLine` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_nim_key`(`nim`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_phone_key`(`phone`),
    UNIQUE INDEX `users_idLine_key`(`idLine`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `roles_id_key`(`id`),
    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `user_roles_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `himpunans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `himpunans_id_key`(`id`),
    UNIQUE INDEX `himpunans_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `himpunanId` INTEGER NOT NULL,

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
    `bersediaDipindahkan` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pendaftaran_himpunan_user_id` INTEGER NOT NULL,
    `himpunanId` INTEGER NOT NULL,

    UNIQUE INDEX `pendaftaran_himpunans_id_key`(`id`),
    UNIQUE INDEX `pendaftaran_himpunans_pendaftaran_himpunan_user_id_key`(`pendaftaran_himpunan_user_id`),
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
    `pendaftaranHimpunanId` INTEGER NOT NULL,

    UNIQUE INDEX `pengalaman_organisasi_himpunans_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    UNIQUE INDEX `fasilitas_yang_dimiliki_pendaftaran_himpunan_pendaftaranHimp_key`(`pendaftaranHimpunanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisies` ADD CONSTRAINT `divisies_himpunanId_fkey` FOREIGN KEY (`himpunanId`) REFERENCES `himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `pengalaman_organisasi_himpunans` ADD CONSTRAINT `pengalaman_organisasi_himpunans_pendaftaranHimpunanId_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas_yang_dimiliki_pendaftaran_himpunan` ADD CONSTRAINT `fasilitas_yang_dimiliki_pendaftaran_himpunan_pendaftaranHim_fkey` FOREIGN KEY (`pendaftaranHimpunanId`) REFERENCES `pendaftaran_himpunans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
