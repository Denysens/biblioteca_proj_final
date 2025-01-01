-- CreateTable
CREATE TABLE "usuarios" (
    "cpf" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nasc" TIMESTAMP(3) NOT NULL,
    "senha" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "emprestimos" (
    "usuario_id" INTEGER NOT NULL,
    "livro_id" INTEGER NOT NULL,
    "data_emprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_devolucao_prevista" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emprestimos_pkey" PRIMARY KEY ("usuario_id","livro_id")
);

-- CreateTable
CREATE TABLE "livros" (
    "id_livro" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT,
    "ano_publicacao" INTEGER,
    "descricao" TEXT,
    "disponivel" BOOLEAN NOT NULL,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "livros_pkey" PRIMARY KEY ("id_livro")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "livros_titulo_key" ON "livros"("titulo");

-- AddForeignKey
ALTER TABLE "emprestimos" ADD CONSTRAINT "emprestimos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emprestimos" ADD CONSTRAINT "emprestimos_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "livros"("id_livro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livros" ADD CONSTRAINT "livros_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
