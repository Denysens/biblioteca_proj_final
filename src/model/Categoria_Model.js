import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Categoria_Model {
    //Consulta o BD e retornar todos os categorias 
    async buscar() {
        const categorias = await prisma.categorias.findMany();
        return categorias;
    }

    //Pesquisa o categoria por id
    async buscar_por_id(id) {
        const categoria = await prisma.categorias.findUnique({
            where: {
                id_categoria: Number(id)
            },
        })
        return categoria;
    }

    //Pesquisa o categoria pelo nome 
    async buscar_por_nome(nome) {
        const categoria = await prisma.categorias.findMany({
            where: {
                nome: {
                    contains: String(nome),
                    mode: "insensitive" //não deferencia maiúscula e minúscula
                }
            },
        })
        return categoria;
    }

    //Insere um novo categoria
    async adicionar(categoria) {
        const nova_categoria = await prisma.categorias.create({
            data: {
                nome: String(categoria.nome)
            },
        });
        return nova_categoria
    }
}

export default new Categoria_Model();