/*
  Warnings:

  - Made the column `dateTime` on table `AppointmentService` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AppointmentService" ALTER COLUMN "dateTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "duration" SET NOT NULL;
