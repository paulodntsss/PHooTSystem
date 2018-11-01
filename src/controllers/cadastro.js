const md5 = require('md5');

module.exports.view = (application, req, resp) => {
    resp.render('cadastro');
}

module.exports.save = async (application, req, resp) => {

    const connection = application.config.dataBase;
    const customerModel = new application.src.models.ClientDAO(connection);

    let {
        name,
        password,
        descricao
    } = req.body;

    const imgSRC = req.uploadName;

    console.log(imgSRC);

    password = md5(password);

    try {
        customerModel.insertUser({
            name, 
            password,
            descricao,
            imgSRC
        }).then((result) => {
            resp.redirect('/');
        }).catch((err) => {
            resp.send(err)
        });
        
    } catch (error) {
        console.log(error.message)
    }
}