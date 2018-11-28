module.exports = application => {
    const uploadService = application.src.services.uploadService;
    const { check } = require('express-validator/check');

    //Rota Index

    application.route('/').get((req, resp) => {
        application.src.controllers.index.home(application, req, resp);
    });

    //Rota de Login

    application
        .route('/login')
        .get((req, resp) => {
            application.src.controllers.login.loginScreen(
                application,
                req,
                resp
            );
        })
        .post(
            check('cpf')
                .isLength({
                    max : 11
                }
                ),
            check('password')
                .isLength({
                    max : 10
                }),
            (req, resp) => {
            application.src.controllers.login.login(application, req, resp);
        });

    //Rotas de Cadastro

    application
        .route('/cadastroJogador')
        .get((req, resp) => {
            application.src.controllers.Jogador.cadastroView(
                application,
                req,
                resp
            );
        })
        .post(
            uploadService.single('file'),
            //  check('nome')
            //      .isLength({
            //          max : 15,
            //      }).withMessage('Tamanho máximo de caracteres permitido no nome é 15'),
            //  check('password')
            //      .isString()
            //      .isLength({
            //          max: 10,
            //          min : 1
            //      }).withMessage('Tamanho máximo de caracteres permitidos na senha é 10 e o mínimo é '),
            //  check('descricao')
            //      .isLength({
            //          max : 100,
            //          min : 0
            //      }).withMessage('Tamanho máximo de caracteres permitidos na descrição é 100'),
            //  check('email')
            //      .isEmail().withMessage('Digite um email válido'),
            //  check('numero')
            //      .isAlphanumeric().withMessage('Apenas números no numero de Telefone')
            //      .isLength({
            //          max: 9,
            //          min:9
            //      }).withMessage('Digite o numero de Telefone no formato : XXXXXXXXX'),
            //  check('ddd')
            //      .isAlphanumeric().withMessage('Apenas números')
            //      .isLength({
            //          max: 2,
            //          min: 2
            //      }).withMessage('Digite o DDD no formato XX'),
            //  check('cpf')
            //      .isLength({
            //          max:11,
            //          min:11
            //      }).withMessage('Digite o CPF no formato XXX.XXX.XXX-XX'),
            //  check('rg')
            //      .isLength({
            //          max : 10
            //      }).withMessage('Tamanho máximo de caracteres permitidos no RG : 10'),
            //  check('altura')
            //      .isNumeric().withMessage('Só deve colocar número na altura')
            //      .isFloat().withMessage('Coloque sua altura no formato X.XX'),
            //  check('posicao')
            //      .isString()
            //      .isLength({
            //          max : 10
            //      }).withMessage("Tamanho máximo de caracteres permitidos no campo de posição é 10")
            //      .isAlpha(),
            //  check('preco')
            //      .isNumeric().withMessage('Digite apenas numeros campo de  preço'),
            //  check('peso')
            //      .isNumeric().withMessage('Digite apenas números no campo de peso')
            //      .isFloat().withMessage('Digite o peso no formato X.XX'),
            //  check('idade')
            //      .isNumeric().withMessage('Apenas números no campo idade')
            //      .isLength({
            //          max : 2,
            //      }).withMessage('O Campo idade só aceita 2 digitos'),
            //  check('rua')
            //      .isString()
            //      .isAlpha().withMessage('Apenas letras no campo rua'),
            //  check('numeroCasa')
            //      .isAlphanumeric().withMessage('Apenas numeros do campo de número da casa'),
            // check('bairro')
            //     .isString()
            //     .isAlpha().withMessage('Apenas letras no campo bairro'),
            //  check('cidade')
            //      .isString()
            //      .isAlpha().withMessage('Apenas letras no campo cidade'),
            //  check('complemento')
            //      .isString()
            //      .isAlpha().withMessage('Apenas letras no campo complemento'),
            //  check('estado')
            //      .isString()
            //      .isAlpha().withMessage('Apenas letras no campo estado'),
            (req, resp) => {
                application.src.controllers.Jogador.save(
                    application,
                    req,
                    resp
                );
            }
        );

    application.route('/cadastroOlheiro').get((req, resp) => {
        application.src.controllers.Olheiro.view(application, req, resp);
    });

    application.route('/cadastroEscola').get((req, resp) => {
        application.src.controllers.Escola.view(application, req, resp);
    });

    //Rota de Jogador Especifico

    application.route('/jogador/:id').get((req, resp) => {
        application.src.controllers.Jogador.perfilJogador(
            application,
            req,
            resp
        );
    });

    //Rotas de Perfis

    application.route('/perfil').get((req, resp) => {
        application.src.controllers.perfilJogador.view(application, req, resp);
    });


};
