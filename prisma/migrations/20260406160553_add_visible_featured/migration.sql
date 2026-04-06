/*
  Warnings:

  - You are about to drop the column `annees` on the `Education` table. All the data in the column will be lost.
  - Changed the type of `date` on the `Certification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "credentialId" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Creation" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "annees",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mention" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Hobby" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "challenge" TEXT,
ADD COLUMN     "context" TEXT,
ADD COLUMN     "detected_technologies" JSONB,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "html_version" TEXT,
ADD COLUMN     "image_path" TEXT,
ADD COLUMN     "languages" JSONB,
ADD COLUMN     "learnings" TEXT[],
ADD COLUMN     "modernity_score" JSONB,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "repo_url" TEXT,
ADD COLUMN     "site_url" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "strategy" TEXT,
ADD COLUMN     "tools" TEXT[],
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SoftSkill" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;
