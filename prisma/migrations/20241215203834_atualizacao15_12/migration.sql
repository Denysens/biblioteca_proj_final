/*
  Warnings:

  - You are about to drop the column `ativo` on the `emprestimos` table. All the data in the column will be lost.
  - You are about to drop the column `delete` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `delete` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "emprestimos" DROP COLUMN "ativo";

-- AlterTable
ALTER TABLE "livros" DROP COLUMN "delete",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "disponivel" SET DEFAULT true;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "delete",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;
