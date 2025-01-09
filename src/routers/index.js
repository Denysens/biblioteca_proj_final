import { Router } from "express";
import categoria_router from "./categoria_router.js";
import emprestimo_router from "./emprestimo_router.js";
import livro_router from "./livro_router.js";
import usuario_router from "./usuario_router.js";

const router = Router();

router.use(categoria_router);
router.use(emprestimo_router);
router.use(livro_router);
router.use(usuario_router);

export default router;