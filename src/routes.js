module.exports = (application) => {
    const auth = new application.src.Auth.Authentication;
    const uploadService = application.src.services.uploadService;

    application.route('/')
        .get((req, resp) => {
            application.src.controllers.index.home(application, req, resp);
        })
    
    application.route('/login')
        .get((req , resp) => {
            application.src.controllers.login.loginScreen(application, req, resp);
        })
        .post((req, resp) => {
            application.src.controllers.login.login(application, req , resp);
        })
    
    application.route('/authentication')
        .get(auth.authVerify , (req, resp) => {
            application.src.controllers.index.home(application, req , resp);
        })

    application.route('/cadastroJogador')
        .get((req, resp) => {
            application.src.controllers.cadastroJogador.view(application, req, resp);
        })
        .post(uploadService.single('file') , (req, resp) => {
            application.src.controllers.cadastroJogador.save(application, req, resp);
        })

    application.route('/cadastroOlheiro')
        .get((req, resp) => {
            application.src.controllers.cadastroOlheiro.view(application, req , resp);
        })

    application.route('/testando')
        .get(auth.authVerify, (req, resp) => {
            resp.send(req.session.userData);
        })
    
    application.route('/jogador/:id')
        .get((req, resp) => {
            application.src.controllers.jogador.getJogador(application, req, resp);
        }) 

}