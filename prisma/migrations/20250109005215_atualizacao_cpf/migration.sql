/*
  Warnings:

  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "emprestimos" DROP CONSTRAINT "emprestimos_usuario_id_fkey";

-- AlterTable
ALTER TABLE "emprestimos" ALTER COLUMN "usuario_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
ALTER COLUMN "cpf" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("cpf");

-- AddForeignKey
ALTER TABLE "emprestimos" ADD CONSTRAINT "emprestimos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
