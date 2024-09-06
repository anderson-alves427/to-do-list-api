/*
  Warnings:

  - You are about to drop the column `perfil` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'BASIC_MEMBER');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "perfil",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'BASIC_MEMBER';
