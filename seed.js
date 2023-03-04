const { Pool } = require('pg');
const pool = require('./dbConn');


/*--------------INSERT INTO villages TABLE---------------- */
pool.query(`SELECT * FROM village`,(error, data)=>{
    if(data.rows[0]['count'] == 0){
        pool.query(`INSERT INTO village (name) VALUES
        ('leaf'),
        ('sand')`,
        (error, data)=>{
            if(error){
                console.log('Insert failed');
            } else {
                console.log(data.rows[0]['count']);
            }
        })
    }
})
/*--------------INSERT INTO CHARACTERS TABLE---------------- */
pool.query(`SELECT * FROM characters`,(error, data)=>{
    console.log(data)
    if(data['rows'][0]['count'] == 0){
        pool.query(`INSERT INTO characters (name, village_id) VALUES
        ("Sasuke", 1),
        ("Gaara", 2),
        ("Sakura", 1),
        ("Killer Bee", 1)`,
        (error, data)=>{
            if(error){
                console.log('Insert failed');
            } else {
                console.log(data.rows[0]['count']);
            }
        })
    }
})
//the above code isn't working

pool.end();