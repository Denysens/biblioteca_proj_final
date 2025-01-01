    //Não precisa mais
    // import pkg from 'pg';
const { Pool } = pkg;

class Database{
    constructor() {
        this.pool = new Pool({
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "pabd",
            database: "biblioteca",
        });
    }

    /*async consultar(sql, params = []) {
        const cliente = await this.pool.connect();
        try {
            const resultado = await cliente.consultar(sql, params);
            return resultado.rows;
        } catch (error) {
            console.error("Erro na consulta: ", error);
            throw error;
        }finally {
            cliente.release();
        }
    }*/
}

export default Database;