import usuario_model from "../model/Usuario_Model.js";
import { parseISO } from 'date-fns';
class usuario_controller {

    //Direcionar para a página de login
    async login(req, res) {
        res.sendFile("./src/views/login.html", { root: process.cwd() });
    }

    //Autenticar login
    async autenticar_login(req, res) {
        const cpf = req.body.cpf;
        const senha = req.body.senha;

        if (!cpf || !Number(senha)) {
            res.json({ message: "Digite todas oo dados: login e a senha, para ter o acesso" });
            return res.redirect("login")
        }

        const usuario = await usuario_model.buscar_por_cpf(cpf);

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

    //Direcionar para a página de usuário comum
    async home_comum(req, res) {
        res.sendFile("./src/views/home_comum.html", { root: process.cwd() });
    }

    //Direcionar para a página do bibliotecário/ funcionário
    async home_func(req, res) {
        res.sendFile("./src/views/home_func.html", { root: process.cwd() });
    }

    //Direciona para uma página com os usuários cadastrados 
    async usuarios_cadastrados(req, res) {
        res.sendFile("./src/views/users_cadastrados.html", { root: process.cwd() });
    }

    //Exibe os usuários ativos no sistema 
    async exibir_usuarios_ativos(req, res) {
        const usuarios = await usuario_model.buscar_usuarios();
        if (usuarios.length === 0) {
            return res.json({ message: "Não há usuários cadastrados no momento" })
        }
        res.json(usuarios);
    }

    //Exibir o usuario ativo de acordo com a pesquisa por cpf
    async exibir_por_cpf(req, res) {
        const cpf = req.body.cpf;

        if (!cpf) {
            return res.json({ message: "Campos obrigatórios ausentes" })
        }

        const usuario = await usuario_model.buscar_por_cpf(cpf);

        if (!usuario) {
            return res.json({ message: "Usuário não encontrado" })
        }

        res.json(usuario);
    }

    //Direciona para a página de cadastro de usuários
    async usuario_cadastrar(req, res) {
        res.sendFile("./src/views/cadastrar_user.html", { root: process.cwd() });
    }

    //Cadastra o usuario 
    async cadastrar_usuario(req, res) {

        try {
            const cpf = req.body.cpf;
            const nome = req.body.nome;
            const data_nasc = req.body.data_nasc;
            const senha = req.body.senha;
            const telefone = req.body.telefone;
            const tipo = req.body.tipo;

            if (!cpf || !nome || !senha) {
                return res.status(400).json({ message: 'Campos obrigatórios estão ausentes' });
            }

            // Validar o formato da data antes de salvar
            /*if (isNaN(Date.parse(data_nasc))) {
                return res.status(400).json({ message: 'Formato de data inválido. Use o formato YYYY-MM-DD.' });
            }*/

            const usuario = await usuario_model.adicionar({ cpf, nome, data_nasc, senha, telefone, tipo });
            return res.status(201).json({ message: "Usuário cadastrado com sucesso." });
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }

    }
    //Atualizar dados do usuario ativo
    async atualizar_usuario(req, res) {
        const cpf = req.body.cpf;
        const senha = req.body.senha;
        const telefone = req.body.telefone
        const usuario = await usuario_model.buscar_por_cpf(cpf)
        try {

            if (!cpf) {
                return res.json({ message: "Faltando o cpf para atualização" })
            }

            if (!senha && !telefone) {
                return res.json({ message: "Campos obrigatórios para atuaizaçõ faltantes" })

            } else if (!senha) {
                const senha = usuario.senha;
                const usuario_atualizado = await usuario_model.atualizar({ cpf, senha, telefone });
                return res.json({ message: "Usuario atualizado com sucesso" });

            } else if (!telefone) {
                const telefone = usuario.telefone;
                const usuario_atualizado = await usuario_model.atualizar({ cpf, senha, telefone });
                return res.json({ message: "Usuario atualizado com sucesso" });

            } else {
                const usuario_atualizado = await usuario_model.atualizar({ cpf, senha, telefone });
                res.json({ message: "Usuario atualizado com sucesso" });
            }

        } catch (error) {
            console.log(error)
            res.json({ message: 'Erro ao atualizar o usuario.' });
        }
    }

    //Excluir usuario
    async deletar_usuario(req, res) {
        const cpf = req.body.cpf;

        if (!cpf) {
            return res.json({ message: 'Campo obrigatório inexistente' });// status 400, erro por parte do cliente
        }
        try {
            const usuario = await usuario_model.deletar(cpf);
            res.json({ message: "Usuario deletado" }); //status 201 é de criado
        } catch (error) {
            res.json({ message: 'Erro ao deletar o usuario.' });
        }
    }

    //Exibir usuarios ativos por nome
    /*async exibir_por_nome(req, res) {
        const nome = req.body.nome;
        const ativo = true;
        const usuarios = await usuario_model.buscar_por_nome({ nome, ativo });
        res.json(usuarios);
    }*/
}

export default new usuario_controller();