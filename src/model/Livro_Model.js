import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class livro_model {

    //Pesquisa os livros 
    async buscar_livros() {
        const livros = await prisma.livros.findMany({
            where: {
                ativo: true
            }
        });
        return livros;
    }

    //Pesquisa o livro pelo nome 
    async buscar_por_titulo(titulo) {
        const livros = await prisma.livros.findMany({
            where: {
                AND: [
                    {
                        titulo: {
                            contains: String(titulo),
                            mode: 'insensitive',
                        }
                    },
                    { ativo: true }
                ]
            }
        });
        return livros;
    }

    //Pesquisa o livro por categoria MINHA
    /*async buscar_por_categoria(id_categoria) {
        const livros = await prisma.livros.findMany({
            where: {
                AND: [
                    { categoria_id: Number(id_categoria) },
                    { ativo: true },
                ]
            }
        });
        return livros;
    }*/
    async buscar_por_categoria(id_categoria) {
        const livros = await prisma.livros.findMany({
            where: {
                AND: [
                    { categoria_id: Number(id_categoria) },  
                    { ativo: true },
                ]
            }
        });
        return livros;
    }


    //Pesquisa o livro por id
    async buscar_por_id(id_livro) {
        const livro = await prisma.livros.findMany({
            where: {
                AND: [
                    { id_livro: Number(id_livro) },
                    { ativo: true }
                ]
            }
        })
        return livro;
    }

    //Insere um novo livro
    async adicionar(livro) {
        const livro_novo = await prisma.livros.create({
            data: {
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                ano_publicacao: Number(livro.ano_publicacao),
                descricao: livro.descricao,
                categoria_id: Number(livro.categoria_id),
            },
        });
        return livro_novo;
    }

    //Atualizar o estado de empréstimo do livro VERIFICAR SE IRÁ USAR 
    async atualizar_disponibilidade(livro) {
        const livro_atualizado = await prisma.livros.update({
            where: {
                id_livro: Number(livro.id_livro)
            },
            data: { disponivel: livro.disponivel },
        })
        return livro_atualizado;
    }

    //Deletar um livro
    async deletar(id_livro) {
        const livro_deletado = await prisma.livros.update({
            where: {
                id_livro: Number(id_livro),
            }, data: {
                ativo: false
            }
        })
        return livro_deletado;
    }

}

export default new livro_model();