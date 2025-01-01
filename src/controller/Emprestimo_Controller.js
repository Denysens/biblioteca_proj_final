import Emprestimo_Model from "../model/Emprestimo_Model.js";
import Livro_Model from "../model/Livro_Model.js";

class Emprestimo_Controller {

    //Direcionar para a página de emprestimos do usuário comum 
    async empres_user(req, res) {
        res.sendFile('./src/views2/empres_user.html', { root: process.cwd() });
    }

    //Direcionar para a página de todos os empréstimos 
    async emprestimos(req, res) {
        res.sendFile("./src/views2/emprestimos.html", { root: process.cwd() });
    }

    //Exibir todos os emprestimos 
    async exibir_emprestimos_ativos(req, res) {
        const emprestimos = await Emprestimo_Model.buscar_emprestimos();
        res.json(emprestimos)
    }

    //Todos os emprestimos do usuario 
    async exibir_emprestimos_usuario(req, res) {
        const id_usuario = req.session.cpf;
        const emprestimos = await Emprestimo_Model.buscar_por_id_user({ id_usuario });
        res.json(emprestimos)
    }

    //Cadastrar um empréstimo 
    async cadastrar(req, res) {
        const usuario_id = req.body.usuario_id;
        const livro_id = req.body.livro_id;
        const data_devolucao_prevista = req.body.data_devolucao_prevista;
        try {
            const novo_emprestimo = await Emprestimo_Model.adicionar({ usuario_id, livro_id, data_devolucao_prevista });
            res.status(201).json({
                message: 'Empréstimo realizado com sucesso!',
                emprestimo: novo_emprestimo,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    //finalizar um empréstimo, definindo a data de devolução 
    async atualizar(req, res) {
        const id_livro = req.body.id_livro;

        try {
            // Encontra o empréstimo ativo para o livro
            const emprestimo = await Emprestimo_Model.buscar_por_id_livro({ id_livro });
            const id_emprestimo = emprestimo.id_emprestimo;

            if (!emprestimo) {
                return res.status(404).json({ message: 'Empréstimo não encontrado.' });
            }

            // Atualiza o registro para marcar a degit volução
            const emprestimo_atualizado = await Emprestimo_Model.atualizar_devolucao({ id_emprestimo });

            // Atualiza o livro para ficar disponível
            const disponivel = true;
            const livro_atualizado = await Livro_Model.atualizar_disponibilidade({ id_livro, disponivel });

            res.status(200).json({ message: 'Livro devolvido com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao devolver o livro.' });
        }
    }
}

export default new Emprestimo_Controller();