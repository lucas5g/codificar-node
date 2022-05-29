/*
  Warnings:

  - Added the required column `ios` to the `cods_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portal` to the `cods_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionIos` to the `cods_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionWeb` to the `cods_products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cods_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "portal" TEXT NOT NULL,
    "ios" TEXT NOT NULL,
    "versionWeb" TEXT NOT NULL,
    "versionIos" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_cods_products" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "cods_products";
DROP TABLE "cods_products";
ALTER TABLE "new_cods_products" RENAME TO "cods_products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
