/*
  Warnings:

  - A unique constraint covering the columns `[pendaftaranHimpunanId]` on the table `fasilitas_yang_dimiliki_pendaftaran_himpunan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fasilitas_yang_dimiliki_pendaftaran_himpunan_pendaftaranHimp_key` ON `fasilitas_yang_dimiliki_pendaftaran_himpunan`(`pendaftaranHimpunanId`);
