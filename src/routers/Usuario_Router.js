import { Router } from "express";
import Usuario_Controller from "../controller/Usuario_Controller.js";
import { auth } from "../middlewares/auth.js";
import { verificar_login } from "../middlewares/type.js";

const usuario_router = Router();

//Rotas dos Usuários

usuario_router.get('/login', Usuario_Controller.login);
usuario_router.post('/login', Usuario_Controller.autenticar_login);

usuario_router.get('/home_comum', auth, Usuario_Controller.home_comum);
usuario_router.get('/home_func', verificar_login, Usuario_Controller.home_func);


//Direciona para a página que exibe todos os usuários cadastrados
usuario_router.get('/usuarios/views', Usuario_Controller.usuarios_cadastrados);
//Exibe os usuários ativos e cadastrados
usuario_router.get('/usuarios', verificar_login, Usuario_Controller.exibir_usuarios_ativos); 


usuario_router.get('/usuarios/cpf',verificar_login, Usuario_Controller.exibir_por_cpf); 

//usuario_router.get('/usuarios/nome', verificar_login, Usuario_Controller.exibir_por_nome); 

//Direciona para página de cadastrar usuários
usuario_router.get('/cadastrar/user', verificar_login, Usuario_Controller.usuario_cadastrar);
//Cadastra os usuários
usuario_router.post('/usuarios', verificar_login, Usuario_Controller.cadastrar_usuario);


usuario_router.put('/usuarios',auth, Usuario_Controller.atualizar_usuario);

usuario_router.delete('/usuarios', verificar_login, Usuario_Controller.deletar_usuario); 

export default usuario_router;

/*sudo su
dhclient
ip a
put  negoicio
coloca o ip
filelizza
npm install no servidor 
pm2 start arq.js*/
