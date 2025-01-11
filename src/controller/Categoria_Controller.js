import categoria_model from "../model/Categoria_Model.js";

class categoria_controller {

    //Exibir todas categorias 
    async exibir(req, res) {
        const categorias = await categoria_model.buscar();

        //Verifica a existencia de categorias no sistema
        if (categorias.length === 0) {
            return res.json({ message: "Não há categorias cadastradas" });
        }
        res.json(categorias);
    }

    //Exibir categorias por nome
    async exibir_por_nome(req, res) {
        const nome = req.body.nome;

        // Validação do nome
        if (!nome || nome.trim() === '') {
            return res.json({ error: "O campo 'nome' é obrigatório para a busca." }); //status(400)
        }

        //Busca as categorias
        const categorias = await categoria_model.buscar_por_nome(nome);

        //Verifica a existencia de alguma categoria com o nome solicitado
        if (categorias.length === 0) {
            return res.json({ message: "Nenhuma categoria encontrada com esse nome." });
        }

        res.json(categorias);
    }

    //Exibir o categoria de acordo com a pesquisa por id_categoria
    async exibir_por_id(req, res) {
        const id = req.params.id_categoria;

        //Validação do valor do id
        if (!id) {
            return res.json({ error: "O valor do id é necessário para a busca" }); //status(400)
        }

        //Busca a categoria pelo id no BD
        const categoria = await categoria_model.buscar_por_id(id);

        //Verifica se há alguma categoria com o is informado
        if (!categoria) {
            return res.json({ message: "Não há nenuma categoria com o id informado" })
        }
        res.json(categoria);
    }

    //Cadastra uma categoria 
    async cadastrar(req, res) {
        const nome = req.body.nome;

        //Validação do valor de nome
        if (!nome) {
            return res.json({ message: "Campos obrigatórios faltando" }); //status(400)
        }
        try {
            const categoria = await categoria_model.adicionar({ nome }); //status(200) ou 201
            res.json({ message: "Categoria cadastrada" });
        } catch (error) {
            res.json({ error: 'Erro ao cadastar o categoria.' }); //status(500)
        }
    }

}

export default new categoria_controller();