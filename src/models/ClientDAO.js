class ClienteDAO {
    constructor(connection) {
        this.connection = connection();
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM Cliente', (err, rows, fields) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(rows);
                }
            })
        })
    }

    getUser({name, password}) {
        return new Promise((resolve, reject) => {
            this.connection.query( `SELECT name, descricao , imgSRC FROM Cliente WHERE name = '${name}' and password = '${password}'`, (err, rows, fields) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(rows[0]);
                }
            })
        })
    }

    getUserByID(ID) {
        return new Promise((resolve, reject) => {
            this.connection.query( `SELECT name, descricao , imgSRC FROM Cliente WHERE ID = '${ID}'`, (err, rows, fields) => {
                if (err) {
                    reject(err)
                }else {
                    resolve(rows[0]);
                }
            })
        })
    }

    updateUser (userID , userUpdates){
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Cliente set ?  WHERE IDCliente =  ${userID}`, userUpdates, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            })
        })
    }


    deleteUser (userID) {
        return new Promise((resolve, reject) => {
            this.connection.query(`DELETE FROM Cliente WHERE IDCliente = ${userID}`, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            })
        })
    }

    insertUser(user) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO Cliente set ?" , user , (err , userInserted) => {
                if(userInserted) {
                    resolve(userInserted);
                }else {
                    reject(err)
                }
            })
        })
    }
       
}

module.exports = () => ClienteDAO;