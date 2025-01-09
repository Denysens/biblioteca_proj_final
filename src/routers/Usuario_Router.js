import { Router } from "express";
import usuario_controller from "../controller/usuario_controller.js";
import { auth } from "../middleWares/auth.js";
import { verificar_login } from "../middleWares/type.js";

const usuario_router = Router();

//Direciona para a página de login 
usuario_router.get('/login', usuario_controller.login);

//Envia os dados de login e posterior autenticação
usuario_router.post('/login', usuario_controller.autenticar_login);

//Direciona para a página de usuário comum (pessoas comuns com cadastro)
usuario_router.get('/home_comum', auth, usuario_controller.home_comum); 

//Direciona para a página de usuário funcionário (bibliotecário)
usuario_router.get('/home_func', verificar_login, usuario_controller.home_func); 

//Direciona para a página que exibe todos os usuários cadastrados
usuario_router.get('/usuarios/views', verificar_login, usuario_controller.usuarios_cadastrados);

//Exibe os usuários ativos e cadastrados
usuario_router.get('/usuarios', verificar_login, usuario_controller.exibir_usuarios_ativos); 

//Exibe o usuário pelo cpf pesquisado
usuario_router.post('/usuarios/cpf', verificar_login, usuario_controller.exibir_por_cpf); 

//Direciona para página de cadastrar usuários
usuario_router.get('/cadastrar_usuarios/views', verificar_login, usuario_controller.usuario_cadastrar); 

//Cadastra os usuários
usuario_router.post('/cadastrar_usuarios', verificar_login, usuario_controller.cadastrar_usuario); 

//Atualizar alguns dados do usuário
usuario_router.put('/usuarios', auth, usuario_controller.atualizar_usuario); 

//Deletar um usuário
usuario_router.delete('/usuarios', verificar_login, usuario_controller.deletar_usuario); 

//usuario_router.get('/usuarios/nome', verificar_login, usuario_controller.exibir_por_nome); 

export default usuario_router;

/*sudo su
dhclient
ip add
put  negocio
coloca o ip
filelizza
npm install no servidor 
pm2 start arq.js*/
