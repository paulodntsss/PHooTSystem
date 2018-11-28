class TimeDAO {
    constructor(connection) {
        this.connection = connection;
    }

    insertTime(time) {
        const {
            cnpj,
            nome,
            numero_jogadores_comprados,
            foto,
            telefone
        } = time;

        let timeExiste;

        const query = `INSERT INTO Time (NOME, CNPJ, NUMERO_JOGADORES_COMPRADOS , FOTO, TELEFONE) VALUES ('${nome}' ,'${cnpj}', '${numero_jogadores_comprados}', '${foto}' , '${telefone}');`;
        
        return new Promise(async (resolve, reject) => {

            try {
                
                timeExiste = await this.getTimeByCnpj(cnpj);

            } catch (error) {
                
                reject(error);

            }

            if(timeExiste) {

                resolve({
                    inserido : false,
                    timeExiste
                })

            }

            this.connection.query(query , (err, result) => {
                if(err) {
                    reject({
                        inserido : false,
                        error : err
                    });
                }
                else {
                    resolve({
                        inserido : true,
                        result
                    });
                }
            })
        });
    }

    updateTime(time){
        const {
            IDTime,
            nome,
            cnpj,
            numero_jogadores_comprados,
            foto,
            telefone
        } = time;

        const query = `UPDATE Time
                        SET CNPJ='${cnpj}, NUMERO_JOGADORES_COMPRADOS='${numero_jogadores_comprados}', FOTO='${foto}' , TELEFONE='${telefone}' , NOME='${nome}'
                        WHERE IDTime='${IDTime}';`;
        
        return new Promise((resolve, reject) => {
            this.query.connection(query , (err, result) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            })
        })
    }

    getTimeByCnpj (cnpj) {

        const query = `SELECT * FROM TIME WHERE CNPJ = '${cnpj}';`;

        return new Promise((resolve, reject) => {

            this.connection.query(query , (err , result) => {

                if(err) {

                    reject(err);

                }else {

                    resolve(result[0]);

                }

            })

        })


    }
}


module.exports = () => TimeDAO;