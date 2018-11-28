const { body, validationResult } = require('express-validator/check');

module.exports.save = async (application, req, resp) => {
    const connection = application.config.dataBase;

    const telefoneModel = new application.src.models.TelefoneDAO(connection);

    const { ddd, numero } = req.body;


    try {
        const id_telefone = await telefoneModel.insertTelefone({
            ddd,
            numero
        });

        if (id_telefone.inserido) {
            return id_telefone.result.insertId;
        } else {
            return id_telefone.telefoneExistente.IDTELEFONE;
        }
    } catch (error) {
        console.log(error);
    }
};