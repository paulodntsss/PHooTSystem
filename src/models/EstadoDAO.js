class EstadoDAO {
    constructor(connection) {
        this.connection = connection();
    }

    insertEstado(estado) {
        const query = `INSERT INTO Estado(ESTADO) VALUES ('${estado}');`;
        let estadoExiste;

        return new Promise(async(resolve, reject) => {
            try {
                estadoExiste =await this.getEstadoByName(estado);
    
            } catch (error) {
                reject(error)
            }
            if (estadoExiste) {
                resolve({
                    estadoExiste,
                    inserido : false
                })
            }
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
        });
    }

    getEstadoByID(id) {
        const query = `SELECT IDESTADO , ESTADO FROM Estado WHERE IDESTADO = ${id};`;

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

    getEstadoByName(estado) {
        const query = `SELECT IDESTADO , ESTADO FROM Estado WHERE ESTADO = '${estado}';`;

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

    getAllEstados() {
        const query = `SELECT ESTADO FROM Estado;`;

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

module.exports = () => EstadoDAO;