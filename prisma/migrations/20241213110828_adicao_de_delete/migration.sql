-- AlterTable
ALTER TABLE "emprestimos" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "livros" ADD COLUMN     "delete" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "delete" BOOLEAN NOT NULL DEFAULT true;
