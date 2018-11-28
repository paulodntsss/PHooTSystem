class TelefoneDAO {
    constructor(connection) {
        this.connection = connection();
    }

    async insertTelefone(telefone) {

        const { ddd, numero } = telefone;

        const query = `INSERT INTO Telefone(DDD, NUMERO) VALUES ('${ddd}' , '${numero}');`;
        return new Promise(async (resolve, reject) => {
            let telefoneExistente;
            try {
                telefoneExistente = await this.getTelefoneByNum(telefone);
            } catch (error) {
                reject({
                    error,
                    inserido : false
                });
            }
            if(telefoneExistente) {
                resolve({
                    telefoneExistente,
                    inserido : false
                })
            }else {
                this.connection.query(query, (err, result) => {
                    if (err) {
                        reject({
                            err,
                            inserido : false
                        });
                    } else {
                        resolve({
                            result,
                            inserido : true
                        });
                    }
                });
            }
            
        });
        
    }

    getTelefoneByID(id) {
        const query = `SELECT IDTELEFONE ,DDD , NUMERO FROM Telefone WHERE IDTELEFONE = ${id}`;

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

    getTelefoneByNum(telefone) {
        const { ddd, numero } = telefone;

        const query = `SELECT IDTELEFONE , DDD , NUMERO FROM Telefone WHERE NUMERO = '${numero}' AND DDD = '${ddd}'`;

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

    updateTelefone(id, telefone) {
        const { ddd, numero } = telefone;

        const query = `UPDATE Telefone
                        set NUMERO='${numero}' , DDD='${ddd}'
                        WHERE IDTelefone = ${id};`;

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

    deleteTelefone(id) {
        const query = `Delete FROM Telefone WHERE IDTelefone = ${id};`;

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


module.exports = () => TelefoneDAO