import { Router } from "express";
import livro_controller from "../controller/Livro_Controller.js";
import { verificar_login } from "../middlewares/type.js"

const livro_router = Router();

//Rotas dos livros

livro_router.get('/livros', livro_controller.exibir_livros_ativos);
livro_router.get('/livros_categoria', livro_controller.exibir_por_categoria);
livro_router.get('/livros/:titulo', livro_controller.exibir_por_titulo);



livro_router.get('/livros/:id_livro', livro_controller.exibir_por_id);

//Direcionar para a página de cadastrar livros
livro_router.get('/cadastrar_livros/views', verificar_login, livro_controller.cadastrar_livro); //verificar_login,

livro_router.post('/cadastrar_livros', verificar_login, livro_controller.cadastrar); //verificar_login

livro_router.delete('/livros', verificar_login, livro_controller.deletar); //verificar_login,

//VERIFICAR SE IRÁ USAR 
livro_router.put('/livros/emprestar/:id_livro', verificar_login, livro_controller.emprestar); //verificar_login

livro_router.put('/livros/devolver/:id_livro', verificar_login, livro_controller.devolver); //verificar_login

/*
router.get('/img', (req, res)=>{
    res.sendFile(process.cwd() + '../../img/user.jpg');
})*/

export default livro_router;