import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Emprestimo_Model {

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
    async buscar_por_id_livro(emprestimo){
        const emprestimo_novo = await prisma.emprestimos.findFirst({
            where: {
                livro_id: emprestimo.id_livro,
            }})
        return emprestimo_novo;
    }

    //Pesquisa os empréstimos de um user específico
    async buscar_por_id_user(emprestimo) {
        const emprestimos = await prisma.emprestimos.findMany({
            where: {
                usuario_id: Number(emprestimo.id_usuario),
                ativo: emprestimo.ativo
            },
        });
        return emprestimos
    }

    //Adicionar um empréstimo
    async adicionar(emprestimo) {
        try {
            // Verificar se o livro está disponível
            const livro = await prisma.livros.findUnique({
                where: { id_livro: emprestimo.livro_id },
            });

            if (!livro || !livro.disponivel) {
                throw new Error('Livro indisponível para empréstimo.');
            }

            // Cadastrar o empréstimo
            const novo_emprestimo = await prisma.emprestimos.create({
                data: {
                    usuario_id: emprestimo.usuario_id,
                    livro_id: emprestimo.livro_id,
                    data_devolucao_prevista: emprestimo.data_devolucao_prevista
                },
            });

            // Atualizar a disponibilidade do livro para false
            await prisma.livros.update({
                where: { id_livro: emprestimo.livro_id },
                data: { disponivel: false },
            });

            return emprestimo;
        } catch (error) {
            throw error;
        }
    }

    //Editar o emmpéstimo /Realizar a devolução do livro
    async atualizar_devolucao(emprestimo) {
        const emprestimo_atualizado = await prisma.emprestimos.update({
            where: {
                id_emprestimo: Number(emprestimo.id_emprestimo)
            },
            data: {
                data_devolucao: new Date(),
                ativo: false
            },
        });
        return emprestimo_atualizado
    }
}

export default new Emprestimo_Model();