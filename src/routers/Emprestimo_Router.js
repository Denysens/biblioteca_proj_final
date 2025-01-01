import { Router } from "express";
import Emprestimo_Controller from "../controller/Emprestimo_Controller.js";
import { auth } from "../middlewares/auth.js";
import { verificar_login } from "../middlewares/type.js";

const emprestimo_router = Router();

//Direcionar para a página de emprestimo do usuário comum 
emprestimo_router.get('/empres_user/views', auth, Emprestimo_Controller.empres_user);
//Direcionar para a página de usuario funcionario
emprestimo_router.get('/emprestimos/views', verificar_login, Emprestimo_Controller.emprestimos);

emprestimo_router.get('/emprestimos', verificar_login, Emprestimo_Controller.exibir_emprestimos_ativos);

emprestimo_router.get('/emprestimos/usuario', auth, Emprestimo_Controller.exibir_emprestimos_usuario);

emprestimo_router.post('/emprestimos', verificar_login, Emprestimo_Controller.cadastrar);

emprestimo_router.put('/emprestimos', verificar_login, Emprestimo_Controller.atualizar);

export default emprestimo_router;