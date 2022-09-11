-- CreateTable
CREATE TABLE "WiFi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "WiFi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WiFi" ADD CONSTRAINT "WiFi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
