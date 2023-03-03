const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const pool = require('./dbConn');
/*----------------CREATING A VILLAGEs TABLE-------------------- */
pool.query(`CREATE TABLE IF NOT EXISTS village (
    id int PRIMARY KEY,
    name text)`, (error, data)=>{
        if(error){
            console.log("CREATE TABLE village failed");
        } else {
            console.log("village table created")
        }
    }
    )
/*-----------------CREATING A CHARACTER TABLE----------------- */
pool.query(`DROP TABLE IF EXISTS characters`);
pool.query(`CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name text
    villages_id int NOT NULL
    FOREIGN KEY(village_id) 
    REFERENCES village.id)`, (error, data)=>{
        if(error){
            console.log("CREATE TABLE characters failed");
        } else {
            console.log("characters table created")
        }
    }
    )

    pool.end();