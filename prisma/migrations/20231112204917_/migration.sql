/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Userdata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Userdata` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Userdata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gamedata" ALTER COLUMN "wagernum" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Userdata" ADD COLUMN     "email" VARCHAR NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Userdata_username_key" ON "Userdata"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Userdata_email_key" ON "Userdata"("email");
