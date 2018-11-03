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

    application.route('/cadastro')
        .get((req, resp) => {
            application.src.controllers.cadastro.view(application, req, resp);
        })
        .post(uploadService.single('file') , (req, resp) => {
            application.src.controllers.cadastro.save(application, req, resp);
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