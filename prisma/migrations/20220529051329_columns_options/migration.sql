-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cods_products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "portal" TEXT NOT NULL,
    "ios" TEXT NOT NULL,
    "versionWeb" TEXT,
    "versionIos" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_cods_products" ("createdAt", "id", "ios", "name", "portal", "updatedAt", "versionIos", "versionWeb") SELECT "createdAt", "id", "ios", "name", "portal", "updatedAt", "versionIos", "versionWeb" FROM "cods_products";
DROP TABLE "cods_products";
ALTER TABLE "new_cods_products" RENAME TO "cods_products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
