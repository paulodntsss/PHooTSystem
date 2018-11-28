module.exports.save =async (application, req , resp) => {
    
    const connection = application.config.dataBase;

    const { cidade } = req.body;

    const cidadeModel = new application.src.models.CidadeDAO(connection);

    try {
        const cidadeDB = await cidadeModel.insertCidade(cidade);


        if(cidadeDB.inserido == false && cidadeDB.cidadeExiste) {
            return cidadeDB.cidadeExiste.IDCIDADE;

        }else if (cidadeDB.inserido === true){

            return cidadeDB.result.insertId;

        }else {

            return cidadeDB;

        }

    } catch (error) {

        console.log(error);
        
    }
}