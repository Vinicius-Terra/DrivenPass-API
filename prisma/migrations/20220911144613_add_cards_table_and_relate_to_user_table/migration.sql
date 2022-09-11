/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'both');

-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "securityCode" INTEGER NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "type" "CardType" NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cards_userId_title_key" ON "Cards"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_userId_title_key" ON "Credentials"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_userId_title_key" ON "Notes"("userId", "title");

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
