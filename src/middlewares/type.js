//Verificar se está logado e é um funcionário
export const verificar_login = (req, res, next) => {

    if (req.session.logado && req.session.tipo == "func") {
        next();
    } else {
        return res.redirect("login");
    }
}