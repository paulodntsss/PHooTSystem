module.exports.save = async(
    application,
    req,
    resp,
    id_cidade,
    id_bairro,
    id_estado
) => {
    const connection = application.config.dataBase;

    const enderecoModel = new application.src.models.EnderecoDAO(connection);

    const { rua, complemento, numeroCasa } = req.body;

    try {
        const id_endereco =await enderecoModel.insertEndereco({
            rua,
            complemento,
            numeroCasa,
            id_cidade,
            id_bairro,
            id_estado
        });

        return id_endereco.insertId;
        
    } catch (error) {
        console.log(error);
    }
};
