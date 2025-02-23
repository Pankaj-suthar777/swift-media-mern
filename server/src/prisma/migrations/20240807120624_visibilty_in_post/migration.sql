-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('ONLY_FOLLOWING', 'PUBLIC');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "visibility" "VisibilityType" DEFAULT 'ONLY_FOLLOWING';
