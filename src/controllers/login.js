const md5 = require('md5');
module.exports.loginScreen = (application, req, resp) => {
    resp.render('login')
}
module.exports.login = async (application, req, resp) => {
    const Auth = new application.src.Auth.Authentication;
    const dataBase = application.config.dataBase;
    const clientModel = new application.src.models.ClientDAO(dataBase);
    let {
        name,
        password
    } = req.body;

    password = md5(password);

    try {
        const user = await clientModel.getUser({
            name,
            password
        });
        if(typeof user !== "undefined") {
            const token = await Auth.signToken(user);
            req.session.authenticated = token;
            resp.redirect('/authentication');
        }else {
            resp.send('Authentication failed')
        }
    } catch (error) {
        resp.send(error.message);
    }
}