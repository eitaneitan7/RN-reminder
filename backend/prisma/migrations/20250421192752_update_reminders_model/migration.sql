-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "address" TEXT,
ADD COLUMN     "importance" "Importance" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "recurrenceRule" TEXT,
ADD COLUMN     "remindBeforeMinutes" INTEGER NOT NULL DEFAULT 15;
