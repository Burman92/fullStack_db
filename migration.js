const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const pool = require('./dbConn');
pool.query(`DROP TABLE IF EXISTS characters`);
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
pool.query(`CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name TEXT,
    villages_id INTEGER FOREIGN KEY REFERENCES village(village.id))`, (error, data)=>{
        if(error){
            console.log("CREATE TABLE characters failed");
        } else {
            console.log("characters table created")
        }
    }
    )

    pool.end();