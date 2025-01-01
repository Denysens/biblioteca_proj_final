import { Router } from "express";
import Categoria_Controller from "../controller/Categoria_Controller.js";
import { verificar_login } from "../middlewares/type.js";

const categoria_router = Router();

//Rotas de Categorias
categoria_router.get('/categorias', Categoria_Controller.exibir);

categoria_router.get('/categorias/:id_categoria', Categoria_Controller.exibir_por_id);

categoria_router.get('/categorias/nome', Categoria_Controller.exibir_por_nome);

categoria_router.post('/categorias',verificar_login, Categoria_Controller.cadastar); 

export default categoria_router;