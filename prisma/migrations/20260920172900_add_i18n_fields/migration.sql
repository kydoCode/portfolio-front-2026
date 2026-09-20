-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "details_de" JSONB,
ADD COLUMN     "details_en" JSONB,
ADD COLUMN     "details_zh" JSONB,
ADD COLUMN     "poste_de" TEXT,
ADD COLUMN     "poste_en" TEXT,
ADD COLUMN     "poste_zh" TEXT;

-- AlterTable
ALTER TABLE "Hobby" ADD COLUMN     "description_de" TEXT,
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_zh" TEXT,
ADD COLUMN     "name_de" TEXT,
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_zh" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "context_de" TEXT,
ADD COLUMN     "context_en" TEXT,
ADD COLUMN     "context_zh" TEXT,
ADD COLUMN     "description_de" TEXT,
ADD COLUMN     "description_en" TEXT,
ADD COLUMN     "description_zh" TEXT,
ADD COLUMN     "learnings_de" TEXT[],
ADD COLUMN     "learnings_en" TEXT[],
ADD COLUMN     "learnings_zh" TEXT[];
