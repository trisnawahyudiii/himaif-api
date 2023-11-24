/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `himpunans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `himpunans_name_key` ON `himpunans`(`name`);
