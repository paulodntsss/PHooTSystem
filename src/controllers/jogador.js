module.exports.getJogador = async (application, req, resp) => {
    const dataBase = application.config.dataBase;
    const clientModel =new application.src.models.ClientDAO(dataBase);

    const id = req.params.id;

    try {
        const user = await clientModel.getUserByID(id);
        if(user) {
            resp.send(user);
        }else {
            resp.render('index' , {jogadores : []});
        }
    } catch (error) {
        resp.send(error.message);
    }
}