/*
  Warnings:

  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `savename` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "savename" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- DropTable
DROP TABLE "Sessions";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
