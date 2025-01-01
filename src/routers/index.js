import { Router } from "express";
import categoria_router from "./Categoria_Router.js";
import emprestimo_router from "./Emprestimo_Router.js";
import livro_router from "./Livro_Router.js";
import usuario_router from "./Usuario_Router.js";

const router = Router();

router.use(categoria_router);
router.use(emprestimo_router);
router.use(livro_router);
router.use(usuario_router);

export default router;