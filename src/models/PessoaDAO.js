class PessoaDAO {
    constructor(connection) {
        this.connection = connection();
    }

    insertPessoa(user) {
        let {
            id_endereco,
            id_telefone,
            nome,
            imgSRC,
            cpf,
            rg,
            password,
            descricao
        } = user;

        const query = `INSERT INTO Pessoa(ID_ENDERECO, NOME, ID_TELEFONE, FOTO , CPF, RG , PASSWORD, DESCRICAO) VALUES ('${id_endereco}', '${nome}', '${id_telefone}', '${imgSRC}', '${cpf}', '${rg}', '${password}' , '${descricao}');`;

        let userExiste;

        return new Promise(async (resolve, reject) => {
            try {
                userExiste = await this.getPessoaByCpf(cpf);
            } catch (error) {
                console.log(error);
            }

            if (userExiste) {
                resolve({
                    inserido: false,
                    userExiste
                });
            } else {
                this.connection.query(query, (err, pessoa) => {
                    if (err) {
                        reject({
                            inserido : false,
                            error : err
                        });
                    } else {
                        resolve({
                            inserido : true,
                            pessoa
                        });
                    }
                });
            }
        });
    }

    getPessoaByCpf(cpf) {
        const query = `SELECT IDPessoa FROM Pessoa WHERE CPF = '${cpf}';`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }
}

module.exports = () => PessoaDAO;
