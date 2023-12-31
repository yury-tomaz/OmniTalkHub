/*
  Warnings:

  - A unique constraint covering the columns `[realm]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `realm` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "realm" VARCHAR(255) NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_realm_key" ON "public"."Organization"("realm");
