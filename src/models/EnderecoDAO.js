class EnderecoDAO {
    constructor(connection) {
        this.connection = connection();
    }

    async insertEndereco(endereco) {

        let {
            rua,
            numeroCasa,
            complemento,
            id_bairro,
            id_cidade,
            id_estado
        } = endereco;

        const query = `INSERT INTO Endereco(RUA, NUMERO, ID_ESTADO, ID_CIDADE, COMPLEMENTO, ID_BAIRRO) VALUES ('${rua}', '${numeroCasa}', '${id_estado}', '${id_cidade}', '${complemento}', '${id_bairro}');`

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    getEnderecos() {
        
        const query = `Select * from Enderecos`;

        return new Promise((resolve, reject) => {

            this.connection.query(query , (err , result) => {

                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }

            })

        })

    }

    
}

module.exports = () => EnderecoDAO;