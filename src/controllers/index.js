module.exports.home =async (application, req ,resp) => {
    const dataBase = application.config.dataBase;
    const clientModel =new application.src.models.ClientDAO(dataBase);

    try {
        const user = await clientModel.getUsers();
        if(user) {
            resp.render('index' , {jogadores : user});
        }else {
            resp.render('index' , {jogadores : []});
        }
    } catch (error) {
        resp.send(error.message);
    }
}