const md5 = require('md5');
const { validationResult } = require('express-validator/check');
module.exports.cadastroView = (application, req, resp) => {
    resp.render('cadastroJogador');
};

module.exports.perfilJogador = async (application, req, resp) => {
    const { id } = req.params;
    const connection = application.config.dataBase;
    const jogadorModel = new application.src.models.JogadorDAO(connection);
    try {
        const jogadorInfo = await jogadorModel.getJogador(id);

        resp.render('perfilJogador', { jogador: jogadorInfo });
    } catch (error) {
        resp.send(error);
    }
};

module.exports.save = async (application, req, resp) => {
    const connection = application.config.dataBase;
    const jogadorModel = new application.src.models.JogadorDAO(connection);
    let {
        peso,
        preco,
        altura,
        idade,
        posicao
    } = req.body;

    const imgSRC = req.uploadName;


    try {
        const id_bairro = await application.src.controllers.Bairro.save(
            application,
            req,
            resp
        );
        const id_cidade = await application.src.controllers.Cidade.save(
            application,
            req,
            resp
        );
        const id_estado = await application.src.controllers.Estado.save(
            application,
            req,
            resp
        );
        const id_telefone = await application.src.controllers.Telefone.save(
            application,
            req,
            resp
        );

        const id_endereco = await application.src.controllers.Endereco.save(
            application,
            req,
            resp,
            id_cidade,
            id_bairro,
            id_estado
        );

        const id_pessoa = await application.src.controllers.Pessoa.save(
            application,
            req,
            resp,
            id_telefone,
            id_endereco
        );

        const jogador = await jogadorModel.insertJogador({
            peso,
            altura,
            preco,
            idade,
            id_pessoa,
            posicao
        });

        resp.send(jogador);
    } catch (error) {
        console.log(error.message);
    }
};
