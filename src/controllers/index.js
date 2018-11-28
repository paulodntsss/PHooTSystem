module.exports.home =async (application, req ,resp) => {
    const dataBase = application.config.dataBase;
    const jogadorModel =new application.src.models.JogadorDAO(dataBase);
    try {
        const user =await jogadorModel.getJogadores();
        console.log(user);
        if(user.length > 0) {
            resp.render('index' , {jogadores : user});
        }else {
            resp.render('index' , {jogadores : {}});
        }
    } catch (error) {
        resp.send(error.message);
    }
}