const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
// const pool = require('./dbConn');
const pool = new Pool({
    user: 'postgres',
    host:'127.0.0.1',
    database: 'NarutoCharacters',
    password: 'password',
    port: 5432
})
// const pool = new Pool({
//     connectionString: 'postgres://shinobi_9ygt_user:LfahlwANLlkyQoV1kyi42Odfiu9fGaPF@dpg-cg2d2f82qv24hdkuutp0-a.oregon-postgres.render.com/shinobi_9ygt?ssl=true'
// })

/*----------------CREATING A VILLAGEs TABLE-------------------- */

pool.query(`CREATE TABLE IF NOT EXISTS village (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100))`, (error, data)=>{
        if(error){
            console.log(error);
            console.log("CREATE TABLE village failed");
        } else {
            // console.log('village data: ', data)
            console.log('attempt to create character table')
            console.log("village table created")
            pool.query(`CREATE TABLE IF NOT EXISTS character (
           id SERIAL PRIMARY KEY,
           name VARCHAR (100),
           main_attack text,
           village_id INT NOT NULL,
           FOREIGN KEY (village_id) REFERENCES village(id) ON DELETE CASCADE)`, (error, data)=>{
               if(error){
                   console.log(error)
                   console.log("CREATE TABLE characters failed");
               } else {
                   // console.log('characters data: ', data)
                   console.log("characters table created")
                   console.log(data.rows)
               }
           }
           )
        }
        // pool.query(`DROP TABLE IF EXISTS character`);
    }
    )
/*-----------------CREATING A CHARACTER TABLE----------------- */


    // pool.end();