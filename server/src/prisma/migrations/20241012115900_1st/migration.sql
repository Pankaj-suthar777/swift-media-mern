-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "text" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "backgroundImage" TEXT,
ADD COLUMN     "githubId" TEXT DEFAULT '',
ADD COLUMN     "googleId" TEXT DEFAULT '',
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local';

-- CreateTable
CREATE TABLE "Notifiction" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Notifiction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notifiction" ADD CONSTRAINT "Notifiction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
