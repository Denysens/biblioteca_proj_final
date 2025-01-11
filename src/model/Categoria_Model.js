import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class categoria_model {

    //Consulta o BD e retorna todos os categorias 
    async buscar() {
        const categorias = await prisma.categorias.findMany();
        return categorias;
    }

    //Pesquisa a categoria pelo nome 
    async buscar_por_nome(nome) {
        const categorias = await prisma.categorias.findMany({
            where: {
                nome: {
                    contains: String(nome),
                    mode: "insensitive" //não deferencia maiúscula e minúscula
                }
            },
        });
        return categorias;
    }

    //Pesquisa a categoria por id
    async buscar_por_id(id) {
        const categoria = await prisma.categorias.findUnique({
            where: {
                id_categoria: Number(id)
            },
        })
        return categoria;
    }

    //Insere uma nova categoria
    async adicionar(categoria) {
        const nova_categoria = await prisma.categorias.create({
            data: {
                nome: String(categoria.nome)
            },
        });
        return nova_categoria
    }
}

export default new categoria_model();