class BairroDAO {
    constructor(connection) {
        this.connection = connection();
    }

    insertBairro(bairro) {
        let bairroExistente;

        const query = `INSERT INTO Bairro(BAIRRO) VALUES ('${bairro}');`;

        return new Promise(async (resolve, reject) => {
            try {
                bairroExistente = await this.getBairroByName(bairro);
            } catch (error) {
                reject(error);
            }
            if (bairroExistente !== undefined) {
                resolve({
                    bairroExistente,
                    inserido: false
                });
            } else {
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

    getBairroByName(bairro) {
        const query = `SELECT IDBAIRRO , BAIRRO FROM Bairro WHERE BAIRRO = '${bairro}';`;

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

    getBairroByID(id) {
        const query = `SELECT IDBAIRRO , BAIRRO FROM Bairro WHERE IDBAIRRO = ${id};`;

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

    getAllBairros() {
        const query = `SELECT BAIRRO FROM Bairro;`;

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

module.exports = () => BairroDAO;
