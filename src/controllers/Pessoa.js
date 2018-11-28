module.exports.save =async (application , req , resp , id_telefone , id_endereco) => {

    const connection = application.config.dataBase;

    const pessoaModel = new application.src.models.PessoaDAO(connection);

    const user = req.body;

    try {
        
        const pessoaBD = await pessoaModel.insertPessoa({...user , id_telefone, id_endereco});

        if(pessoaBD.inserido === false && pessoaBD.userExiste) {
            return pessoaBD.userExiste.IDPessoa;
        }else if (pessoaBD.inserido == true){
            return pessoaBD.pessoa.insertId;
        }else {
            return pessoaBD.error;
        }

    } catch (error) {
        console.log(error);
    }



}