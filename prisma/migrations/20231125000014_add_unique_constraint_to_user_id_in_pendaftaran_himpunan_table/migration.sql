/*
  Warnings:

  - A unique constraint covering the columns `[pendaftaran_himpunan_user_id]` on the table `pendaftaran_himpunans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pendaftaran_himpunans_pendaftaran_himpunan_user_id_key` ON `pendaftaran_himpunans`(`pendaftaran_himpunan_user_id`);
