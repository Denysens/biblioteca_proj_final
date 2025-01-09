import { PrismaClient } from "@prisma/client";
import { parseISO } from 'date-fns';

const prisma = new PrismaClient();

class emprestimo_model {

    //Pesquisa todos os emprestimos
    async buscar_emprestimos() {
        const emprestimos = await prisma.emprestimos.findMany({
            where: {
                ativo: true
            }
        });
        return emprestimos;
    }

    //Pesquisa os empréstimos de um usuario específico
    async buscar_por_id_user(id_usuario) {
        const emprestimos = await prisma.emprestimos.findMany({
            where: {
                usuario_id: id_usuario,
            },
        });
        return emprestimos
    }

    //Adicionar um empréstimo
    async adicionar(emprestimo) {
        // Cadastrar o empréstimo
        const novo_emprestimo = await prisma.emprestimos.create({
            data: {
                usuario_id: emprestimo.usuario_id,
                livro_id: emprestimo.livro_id,
                data_devolucao_prevista: parseISO(emprestimo.data_devolucao_prevista)
            },
        });
        return novo_emprestimo;
    }

    //Pesquisa os empréstimos de um livro específico
    async buscar_por_id_livro(id_livro) {
        const emprestimo = await prisma.emprestimos.findFirst({
            where: {
                AND: [
                    { livro_id: id_livro },
                    { ativo: true }
                ]
            }
        })
        return emprestimo;
    }

    //Editar o emmpéstimo /Realizar a devolução do livro
    async atualizar_devolucao(id_emprestimo) {
        const emprestimo_atualizado = await prisma.emprestimos.update({
            where: {
                id_emprestimo: Number(id_emprestimo)
            },
            data: {
                data_devolucao: new Date(),
                ativo: false
            },
        });
        return emprestimo_atualizado
    }
}

export default new emprestimo_model();