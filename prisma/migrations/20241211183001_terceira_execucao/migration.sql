/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");
