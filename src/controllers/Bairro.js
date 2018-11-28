module.exports.save = async (application , req , resp ) => {

    const connection = application.config.dataBase;

    const bairroModel = new application.src.models.BairroDAO(connection);

    const { bairro } = req.body;

    try {
        
        const bairroDB = await bairroModel.insertBairro(bairro);

        if(bairroDB.inserido == false && bairroDB.bairroExistente) {

            return bairroDB.bairroExistente.IDBAIRRO;

        }else if (bairroDB.inserido === true){

            return bairroDB.result.insertId;

        }else {

            return bairroDB;

        }
    } catch (error) {
        
        console.log(error);

    }
}