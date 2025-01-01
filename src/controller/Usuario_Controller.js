import Usuario_Model from "../model/Usuario_Model.js";

class Usuario_Controller {

    //Direcionar para a página de login
    async login(req, res) {
        res.sendFile("./src/views2/login.html", { root: process.cwd() });
    }

    //Direcionar para a página de usuário comum
    async home_comum(req, res) {
        res.sendFile("./src/views2/home_comum.html", { root: process.cwd() });
    }

    //Direcionar para a página do bibliotecário/ funcionário
    async home_func(req, res) {
        res.sendFile("./src/views2/home_func.html", { root: process.cwd() });
    }

    //Direciona para uma página com os usuários cadastrados 
    async usuarios_cadastrados(req, res) {
        res.sendFile("./src/views2/users_cadastrados.html", { root: process.cwd() });
    }

    //Direciona para a página de cadastro de usuários
    async usuario_cadastrar(req, res) {
        res.sendFile("./src/views2/cadastrar_user.html", { root: process.cwd() });
    }

    //Autenticar login
    async autenticar_login(req, res) {
        const cpf = req.body.cpf;
        const senha = req.body.senha;

        const usuario = await Usuario_Model.buscar_por_cpf({cpf});

        if (!usuario) {
            //throw new error("Usuário não encontrado");
            return res.redirect("login");
        }
        if (senha != usuario.senha) {
            //throw new error("Senha incorreta");
            return res.redirect("login");
        }

        req.session.cpf = usuario.cpf;
        req.session.logado = true;
        req.session.tipo = usuario.tipo;

        if (usuario.tipo == "func") {
            return res.redirect("home_func");

        } else {
            return res.redirect("home_comum");
        }
    }

    //De acordo com a requisição responde com os dados usuarios em json usando o model
    async exibir_usuarios_ativos(req, res) {
        const ativo = true;
        const usuarios = await Usuario_Model.buscar_usuarios({ ativo });
        res.json(usuarios);
    }

    //Exibir o usuario ativo de acordo com a pesquisa por cpf
    async exibir_por_cpf(req, res) {
        const cpf = req.body.cpf;
        const ativo = true;
        const usuario = await Usuario_Model.buscar_por_cpf({ cpf, ativo });
        res.json(usuario);
    }

    //Exibir usuarios ativos por nome
    /*async exibir_por_nome(req, res) {
        const nome = req.body.nome;
        const ativo = true;
        const usuarios = await Usuario_Model.buscar_por_nome({ nome, ativo });
        res.json(usuarios);
    }*/

    //Cadastra o usuario 
    async cadastrar_usuario(req, res) {
        const cpf = req.body.cpf;
        const nome = req.body.nome;
        const data_nasc = req.body.data_nasc;
        const senha = req.body.senha;
        const telefone = req.body.telefone;
        const tipo = req.body.tipo;

        if (!cpf || !nome || !senha) {
            return res.json({ erro: 'Campos obrigatórios estão ausentes' });
        }
        try {
            const usuario = await Usuario_Model.adicionar({ cpf, nome, data_nasc, senha, telefone, tipo });
            res.json({ message: "usuario cadastrado" }); 
        } catch (error) {
            res.json({ erro: 'Erro ao cadastar o usuario.' });
        }
    }

    //Atualizar dados do usuario ativo
    async atualizar_usuario(req, res) {
        const cpf = req.body.cpf;
        const senha = req.body.senha;
        const telefone = req.body.telefone;

        if (!cpf || !senha) {
            return res.status(400).json({ erro: 'Campos obrigatórios estão ausentes' });// status 400, erro por parte do cliente
        }
        try {
            const usuario = await Usuario_Model.atualizar({ cpf, senha, telefone });
            res.status(201).json({ message: "Usuario atualizado" }); //status 201 é de criado
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar o usuario.' });
        }
    }

    //Excluir usuario
    async deletar_usuario(req, res) {
        const cpf = req.body.cpf;
        const ativo = false;

        if (!cpf) {
            return res.status(400).json({ erro: 'Usuário inexistente' });// status 400, erro por parte do cliente
        }
        try {
            const usuario = await Usuario_Model.ativar_desativar({ cpf, ativo});
            res.status(201).json({ message: "Usuario deletado" }); //status 201 é de criado
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao deletar o usuario.' });
        }

        const usuario = await Usuario_Model.ativar_desativar({ cpf, ativo });
        res.json({ message: "Usuario deletado" });
    }
}

export default new Usuario_Controller();