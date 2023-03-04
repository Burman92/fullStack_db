const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const pool = require('./dbConn');

/*----------------CREATING A VILLAGEs TABLE-------------------- */

pool.query(`CREATE TABLE IF NOT EXISTS village (
    id SERIAL PRIMARY KEY,
    name text)`, (error, data)=>{
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
    name text,
    CONSTRAINT village_id FOREIGN KEY (village.id) REFERENCES village (village.id));`, (error, data)=>{
        if(error){
            console.log(error)
            console.log("CREATE TABLE characters failed");
        } else {
            console.log("characters table created")
        }
    }
    )

    pool.end();