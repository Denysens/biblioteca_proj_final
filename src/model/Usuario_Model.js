import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Usuario_Model {
    //Consulta o BD e retornar todos os usuarios ativos
    async buscar_usuarios(usuario) {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                ativo: usuario.ativo
            }
        });
        return usuarios;
    }

    //Pesquisa o usuario pelo CPF
    async buscar_por_cpf(usuario) {
        const usuario_buscado = await prisma.usuarios.findUnique({
            where: {
                cpf: Number(usuario.cpf),
                ativo: true
            }
        });
        return usuario_buscado;
    }

    //Pesquisa o usuario pelo nome 
    async buscar_por_nome(usuario) {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                nome: {
                    contains: String(usuario.nome),
                    mode: 'insensitive', //não deferencia maiúscula e minúscula
                },
                ativo: usuario.ativo
            }
        });
        return usuarios;
    }

    //Insere um novo usuario
    async adicionar(usuario) {
        const novo_usuario = await prisma.usuarios.create({
            data: {
                cpf: Number(usuario.cpf),
                nome: usuario.nome,
                data_nasc: usuario.data_nasc,
                senha: Number(usuario.senha),
                telefone: usuario.telefone,
                tipo: usuario.tipo
            }
        })
        return novo_usuario
    }

    //Atualizar informações do usuário
    async atualizar(usuario) {
        const usuario_atualizado = await prisma.usuarios.update({
            where: {
                cpf: Number(usuario.cpf)
            },
            data: {
                senha: Number(usuario.senha),
                telefone: usuario.telefone
            }
        })
        return usuario_atualizado
    }

    //("deletar" ou "reativar") um usuario
    async ativar_desativar(usuario) {
        const usuario_deletado = await prisma.usuarios.update({
            where: {
                cpf: Number(usuario.cpf),
            },
            data: {
                ativo: Boolean(usuario.ativo)
            }
        })
        console.log(usuario_deletado);
    }
}

export default new Usuario_Model();