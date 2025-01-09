import { Router } from "express";
import emprestimo_controller from "../controller/emprestimo_controller.js";
import { auth } from "../middleWares/auth.js";
import { verificar_login } from "../middleWares/type.js";

const emprestimo_router = Router();

//Direciona para a página de todos os empréstimos ativos
emprestimo_router.get('/emprestimos/views', verificar_login, emprestimo_controller.emprestimos_views); // verificar_login,

//Exibir todos os empréstimos
emprestimo_router.get('/emprestimos', verificar_login, emprestimo_controller.exibir_emprestimos_ativos); //verificar_login,

//Direcionar para a página de emprestimo do usuário comum 
emprestimo_router.get('/emprestimos_usuario/views', auth, emprestimo_controller.emprestimos_usuario_views); //auth, 

//Exibir os empréstimos de um usuário
emprestimo_router.get('/emprestimos_usuario', auth, emprestimo_controller.exibir_emprestimos_usuario);//auth,

//Cadastrar empréstimo 
emprestimo_router.post('/emprestimos', verificar_login, emprestimo_controller.cadastrar); //verificar_login,

emprestimo_router.put('/emprestimos', verificar_login, emprestimo_controller.atualizar); //verificar_login,

export default emprestimo_router;