const jwt = require('jsonwebtoken');
class Auth {
    async authVerify(req, resp, next) {
        if (typeof req.session.authenticated !== "undefined" ||
            req.session.authenticated !== null) {
            try {
                const token = req.session.authenticated;
                const data = await jwt.verify(token, process.env.authSecret);
                req.session.userData = data;
                next()
            } catch (error) {
                resp.send("Usuário não autenticado");
            }
        } else {
            resp.redirect('/');
        }
    }

    async signToken(user) {
        const {
            name,
            descricao,
            imgSrc
        } = user;
        try {
            const token = await jwt.sign({
                name,
                descricao,
                imgSrc
            }, process.env.authSecret);
            return token;
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = () => Auth