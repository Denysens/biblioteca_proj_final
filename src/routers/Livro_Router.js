import { Router } from "express";
import Livro_Controller from "../controller/Livro_Controller.js";
import { verificar_login } from "../middlewares/type.js"
const livro_router = Router();

//Rotas dos livros

livro_router.get('/livros', Livro_Controller.exibir_livros_ativos);
livro_router.get('/livros/:titulo', Livro_Controller.exibir_por_titulo);

//Direciona para a página de cadastrar livros
livro_router.get('/cadastrar/livros', verificar_login, Livro_Controller.cadastrar_livro);
//Cadastra os livros
livro_router.post('/livros',verificar_login, Livro_Controller.cadastrar); 

livro_router.put('/livros/:id',verificar_login, Livro_Controller.atualizar_emprestimo);
//livro_router.delete('/livros/:id',verificar_login, Livro_Controller.deletar);

//livro_router.get('/livros/categoria', Livro_Controller.exibir_por_categoria);

//livro_router.get('/livros/:id', Livro_Controller.exibir_por_id);

/*
router.get('/img', (req, res)=>{
    res.sendFile(process.cwd() + '../../img/user.jpg');
})*/

export default livro_router;