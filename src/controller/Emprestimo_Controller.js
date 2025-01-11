import emprestimo_model from "../model/Emprestimo_Model.js";
import livro_model from "../model/Livro_Model.js";
import usuario_model from "../model/Usuario_Model.js";

class emprestimo_controller {

    //Direcionar para a página de todos os empréstimos 
    async emprestimos_views(req, res) {
        res.sendFile("./src/views/emprestimos.html", { root: process.cwd() });
    }

    //Exibir todos os emprestimos 
    async exibir_emprestimos_ativos(req, res) {
        const emprestimos = await emprestimo_model.buscar_emprestimos();
        if (emprestimos.length === 0) {
            return res.json({ message: "Não há empréstimos ativos no momento" })
        }
        res.json(emprestimos)
    }

    //Direcionar para a página de emprestimos do usuário comum 
    async emprestimos_usuario_views(req, res) {
        res.sendFile('./src/views/empres_user.html', { root: process.cwd() });
    }

    //Todos os emprestimos de um usuario 
    async exibir_emprestimos_usuario(req, res) {
        const id_usuario = req.session.cpf;

        if (!id_usuario) {
            return res.json({ message: "Usuário não logado!" })
        }

        const emprestimos = await emprestimo_model.buscar_por_id_user(id_usuario);

        if (emprestimos.length === 0) {
            return res.json({ message: "Não há empréstimos cadastrados para esse usuário" })
        }
        res.json(emprestimos)
    }

    //Cadastrar um empréstimo 
    async cadastrar(req, res) {
        const usuario_id = req.body.usuario_id;
        const livro_id = req.body.livro_id;
        const data_devolucao_prevista = req.body.data_devolucao_prevista;

        //Verifica a entrada dos dados obrigatórios
        if (!usuario_id || !livro_id || !data_devolucao_prevista) {
            return res.json({ message: "Campos obrigatórios faltantes" });
        }
        //Verifica se o usuario existe no sistema
        const usuario = await usuario_model.buscar_por_cpf(usuario_id);

        if (!usuario || usuario.length === 0) {
            return res.json({ message: "Usuário inexistente no sistema" })
        }

        // Verifica se o livro está disponível
        const livro = await livro_model.buscar_por_id(livro_id);

        if (livro.length === 0 || livro[0].disponivel == false) {
            return res.json({ message: "Livro indiponível para emprestimo" });
        }

        try {

            //Cadastra empréstimo
            const novo_emprestimo = await emprestimo_model.adicionar({ usuario_id, livro_id, data_devolucao_prevista });

            if (novo_emprestimo.length === 0) {
                return res.json({ message: "Erro ao cadastrar empréstimo" });
            }

            //LEMBRAR DE ATUALIZAR ESTAD DO LIVRO NO FRONT ,
            // Atualizar a disponibilidade do livro para false
            const id_livro = livro_id;
            const disponivel = false;
            const livro_atualizado = await livro_model.atualizar_disponibilidade({ id_livro, disponivel })

            if (!livro_atualizado) {
                return res.json({ message: "Livro não atualizado" })
            }

            res.json({ message: "Empréstimo cadastrado" })

        } catch (error) {
            res.json({ message: "Erro inesperado ao realizar cadastrar emprestimo" });
        }
    }

    //finalizar um empréstimo, definindo a data de devolução 
    async atualizar(req, res) {
        const id_livro = req.body.id_livro;
        //Verifica a entrada dos dados obrigatórios
        if (!id_livro) {
            return res.json({ message: "Campos obrigatórios faltantes" });
        }
        try {

            // Encontra o empréstimo ativo para o livro
            const emprestimo = await emprestimo_model.buscar_por_id_livro(id_livro);

            if (!emprestimo) {
                return res.json({ message: 'Empréstimo não encontrado para esse livro.' });
            }

            const id_emprestimo = emprestimo.id_emprestimo;

            // Atualiza o registro para marcar a data de devolução
            const emprestimo_atualizado = await emprestimo_model.atualizar_devolucao(id_emprestimo);

            if (!emprestimo_atualizado) {
                return res.json({ message: "Erro ao atualizar emprestimo" });
            }

            // Atualiza o livro para ficar disponível
            //NÃO CONSEGUE ATUALIZAR O ESTADO DO LIVRO APENAS ESSE ERRO 

            const disponivel = true;
            const livro_atualizado = await livro_model.atualizar_disponibilidade({ id_livro, disponivel });

            if (!livro_atualizado) {
                return res.json({ message: 'Não foi possivel devolver o livro' });
            }
            res.json({ message: 'Livro devolvido com sucesso.' });

        } catch (error) {
            res.json({ erro: 'Erro ao devolver o livro.' });
        }
    }
}

export default new emprestimo_controller();