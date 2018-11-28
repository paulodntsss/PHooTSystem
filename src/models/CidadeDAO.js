class CidadeDAO {
    constructor(connection) {
        this.connection = connection();
    }

    insertCidade(cidade) {

        return new Promise(async (resolve, reject) => {

            let cidadeExiste;

            try {

                cidadeExiste = await this.getCidadeByName(cidade);

            } catch (error) {

                reject(error);

            }

            if (cidadeExiste) {

                resolve({
                    cidadeExiste,
                    inserido: false
                });

            } else {
                const query = `INSERT INTO Cidade(CIDADE) VALUES ('${cidade}')`;

                this.connection.query(query, (err, result) => {
                    if (err) {
                        reject({
                            err,
                            inserido: false
                        });
                    } else {
                        resolve({
                            result,
                            inserido: true
                        });
                    }
                });
            }
        });
    }

    getCidadeByID(id) {
        const query = `SELECT * FROM Cidade WHERE IDCIDADE = '${id}';`;

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

    getCidadeByName(cidade) {
        const query = `SELECT * FROM Cidade WHERE CIDADE = '${cidade}';`;

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

    getAllCidades() {
        const query = `SELECT CIDADE FROM Cidade`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = () => CidadeDAO;
