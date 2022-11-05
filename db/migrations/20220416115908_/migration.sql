/*
  Warnings:

  - You are about to drop the column `Company` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Company` on the `Review` table. All the data in the column will be lost.
  - Added the required column `company` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "Company",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "experience" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "Company",
ADD COLUMN     "company" TEXT NOT NULL;
