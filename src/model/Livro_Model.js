import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Livro_Model {
    //Pesquisa os livros 
    async buscar_livros(livro) {
        const livros = await prisma.livros.findMany({
            where: {
                ativo: livro.ativo
            }
        });
        return livros;
    }

    //Pesquisa o livro pelo nome 
    async buscar_por_titulo(livro) {
        const livros_buscados = await prisma.livros.findMany({
            where: {
                AND: [
                    {
                        titulo: {
                            contains: String(livro.titulo),
                            mode: 'insensitive',
                        }
                    },
                    { ativo: Boolean(livro.ativo) }
                ]
            }
        });
        return livros_buscados;
    }
    //Pesquisa o livro por id
    async buscar_por_id(livro) {
        const livro_buscado = await prisma.livros.findMany({
            where: {
                AND: [
                    { id_livro: Number(livro.id_livro) },
                    { ativo: livro.ativo }
                ]
            }
        })
        return livro_buscado;
    }

    //Insere um novo livro
    async adicionar(livro) {
        const novo_livro = await prisma.livros.create({
            data: {
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                ano_publicacao: Number(livro.ano_publicacao),
                descricao: livro.descricao,
                categoria_id: Number(livro.categoria_id),
            },
        });
        return novo_livro;
    }

    //Atualizar o estado de empréstimo do livro
    async atualizar_disponibilidade(livro) {
        const livro_atualizado = await prisma.livros.update({
            where: {
                id_livro: Number(livro.id_livro),
                ativo:true
            },
            data: { disponivel: livro.disponivel },
        })
        return livro_atualizado
    }

    //Deletar ou reativar um livro
    async ativar_desativar(livro) {
        const livro_deletado = await prisma.livros.update({
            where: {
                id_livro: Number(livro.id),
            }, data: {
                ativo: Boolean(livro.ativo)
            }
        })
        console.log(livro_deletado);
    }

    //Pesquisa o livro por categoria
    /*async buscar_por_categoria(livro) {
        const livros = await prisma.livros.findMany({
            where: {
                AND: [
                    { categoria_id: Number(livro.id_categoria) },
                    { ativo: livro.ativo },
                ]
            }
        })
        return livros;
    }*/


}

export default new Livro_Model();