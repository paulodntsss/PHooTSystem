const md5 = require('md5');
const { validationResult } = require('express-validator/check');

module.exports.loginScreen = (application, req, resp) => {
    resp.render('login');
};
module.exports.login = async (application, req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        resp.send(errors.array()[0].msg);
    } else {
        const Auth = new application.src.Auth.Authentication();
        const dataBase = application.config.dataBase;
        const jogadorDAO = new application.src.models.JogadorDAO(dataBase);
        let { cpf, password } = req.body;

        password = password;

        try {
            const user = await jogadorDAO.getJogadorByCpfAndPassword({
                cpf,
                password
            });

            console.log(user);
            
            if (typeof user !== 'undefined') {
                const token = await Auth.signToken(user);
                req.session.authenticated = token;
                resp.redirect('/authentication');
            } else {
                resp.send('Authentication failed');
            }
        } catch (error) {
            resp.send(error.message);
        }
    }
};
