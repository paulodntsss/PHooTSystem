class JogadorDAO {
    constructor(connection) {
        this.connection = connection();
    }
    insertJogador(jogador) {
        let {
            peso,
            preco,
            idade,
            altura,
            id_pessoa,
            posicao
        } = jogador;

        const query = `INSERT INTO Jogador(PESO, PRECO, IDADE, ALTURA, ID_PESSOA , POSICAO) VALUES ('${peso}', '${preco}', '${idade}', '${altura}', ${id_pessoa} ,'${posicao}');`;

        return new Promise((resolve, reject) => {
            this.connection.query(query , (err, result) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            })
        });
    }

    getJogador(id) {
        const query = `SELECT NOME , PESO, PRECO, IDADE, ALTURA, ID_PESSOA FROM Jogador 
                        INNER JOIN Pessoa 
                        ON Jogador.ID_PESSOA=Pessoa.IDPESSOA 
                        WHERE IDJogador = ${id};`;

        return new Promise((resolve, reject) => {
            this.connection.query(query , (err , result) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(result[0])
                }
            })
        })
    }

    getJogadorByCpfAndPassword(user) {

        const {cpf , password} = user;

        console.log(cpf, password);

        const query = `SELECT * FROM Pessoa INNER JOIN Jogador ON Pessoa.IDPESSOA = Jogador.ID_Pessoa WHERE Pessoa.CPF = '${cpf}' AND Pessoa.PASSWORD = '${password}';`;

        return new Promise((resolve, reject) => {
            this.connection.query(query , (err , result) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(result[0])
                }
            })
        })

    }

    getJogadores() {
        const query = `SELECT NOME, IDADE, ID_PESSOA , IDJogador, FOTO, DESCRICAO FROM Jogador
                        INNER JOIN Pessoa
                        ON Pessoa.IDPESSOA = Jogador.ID_PESSOA`

        return new Promise((resolve , reject) => {
            this.connection.query(query , (err, result) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = () => JogadorDAO;