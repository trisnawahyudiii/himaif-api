/*
  Warnings:

  - Added the required column `alasanMasukHimpunan` to the `pendaftaran_himpunans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobi` to the `pendaftaran_himpunans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill` to the `pendaftaran_himpunans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pendaftaran_himpunans` ADD COLUMN `alasanMasukHimpunan` VARCHAR(191) NOT NULL,
    ADD COLUMN `hobi` VARCHAR(191) NOT NULL,
    ADD COLUMN `skill` VARCHAR(191) NOT NULL;
