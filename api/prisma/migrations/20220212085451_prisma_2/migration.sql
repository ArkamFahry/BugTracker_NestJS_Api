/*
  Warnings:

  - Added the required column `progress` to the `Bug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bug" ADD COLUMN     "progress" INTEGER NOT NULL,
ALTER COLUMN "issue_closed" DROP NOT NULL;
