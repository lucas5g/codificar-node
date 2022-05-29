/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `cods_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cods_products_name_key" ON "cods_products"("name");
