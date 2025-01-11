import { PrismaClient } from "@prisma/client";
import { parseISO } from 'date-fns';
import { format } from 'date-fns';

const prisma = new PrismaClient();

class usuario_model {

    //Pesquisa o usuario pelo CPF
    async buscar_por_cpf(cpf) {
        const usuario = await prisma.usuarios.findUnique({
            where: {
                cpf: cpf,
                ativo: true
            }
        });
        return usuario;
    }

    //Consulta o BD e retornar todos os usuarios ativos
    async buscar_usuarios() {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                ativo: true
            }
        });
        return usuarios;
    }

    //Insere um novo usuario
    async adicionar(usuario) {
        const data_nasc = usuario.data_nasc ? new Date(`${usuario.data_nasc}T00:00:00.000Z`) : null;
        const novo_usuario = await prisma.usuarios.create({
            data: {
                cpf: usuario.cpf,
                nome: usuario.nome,
                data_nasc: data_nasc,
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
                cpf: usuario.cpf
            },
            data: {
                senha: Number(usuario.senha),
                telefone: usuario.telefone
            }
        })
        return usuario_atualizado
    }

    //Deletar um usuario
    async deletar(cpf) {
        const usuario_deletado = await prisma.usuarios.update({
            where: {
                cpf: cpf,
            },
            data: {
                ativo: false
            }
        })
        return usuario_deletado;
    }
    /* //Pesquisa o usuario pelo nome 
     async buscar_por_nome(nome) {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                nome: {
                    contains: String(nome),
                    mode: 'insensitive', //não deferencia maiúscula e minúscula
                },
                ativo: true
            }
        });
        return usuarios;
    }*/
}

export default new usuario_model();