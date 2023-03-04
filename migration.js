const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const pool = require('./dbConn');

/*----------------CREATING A VILLAGEs TABLE-------------------- */

pool.query(`CREATE TABLE IF NOT EXISTS village (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100))`, (error, data)=>{
        if(error){
            console.log("CREATE TABLE village failed");
        } else {
            console.log(data)
            console.log("village table created")
        }
    }
    )
/*-----------------CREATING A CHARACTER TABLE----------------- */

pool.query(`CREATE TABLE IF NOT EXISTS character (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100),
    village_id INT NOT NULL,
    FOREIGN KEY (village_id) REFERENCES village(id) ON DELETE CASCADE)`, (error, data)=>{
        if(error){
            console.log(error)
            console.log("CREATE TABLE characters failed");
        } else {
            console.log("characters table created")
        }
    }
    )

    pool.end();