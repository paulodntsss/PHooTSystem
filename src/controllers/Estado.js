module.exports.save =async (application , req, resp) => {
    
    const connection = application.config.dataBase;
    const estadoModel = new application.src.models.EstadoDAO(connection);

    const {estado} = req.body;

    try {
        const estadoDB = await estadoModel.insertEstado(estado);

        if(estadoDB.inserido == false && estadoDB.estadoExiste) {
            
            return estadoDB.estadoExiste.IDESTADO;

        }else if (estadoDB.inserido == true) {

            return estadoDB.result.insertId;
            
        }else {
            return estadoDB.err;
        }

    } catch (error) {

        console.log(error);
        
    }
}