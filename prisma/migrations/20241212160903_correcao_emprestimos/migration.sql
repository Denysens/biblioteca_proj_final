/*
  Warnings:

  - The primary key for the `emprestimos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "emprestimos" DROP CONSTRAINT "emprestimos_pkey",
ADD COLUMN     "data_devolucao" TIMESTAMP(3),
ADD COLUMN     "id_emprestimo" SERIAL NOT NULL,
ADD CONSTRAINT "emprestimos_pkey" PRIMARY KEY ("id_emprestimo");
