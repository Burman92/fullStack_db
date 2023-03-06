const { Pool } = require('pg');
// const pool = require('./dbConn');

const pool = new Pool({
    connectionString: 'postgres://shinobi_9ygt_user:LfahlwANLlkyQoV1kyi42Odfiu9fGaPF@dpg-cg2d2f82qv24hdkuutp0-a.oregon-postgres.render.com/shinobi_9ygt?ssl=true'
})

/*--------------INSERT INTO villages TABLE---------------- */
pool.query(`SELECT * FROM village`,(error, data)=>{
    // .rows[0]['count'] 
    if(data.rows.length == 0){
        pool.query(`INSERT INTO village (name) VALUES
        ('leaf'),
        ('sand') RETURNING *`,
        (error, data)=>{
            if(error){
                console.log('Village Insert failed');
                console.log(error);
            } else {
                console.log(data.rows[0]);
            }
        })
    }
})
/*--------------INSERT INTO CHARACTERS TABLE---------------- */
pool.query(`SELECT * FROM character`,(error, data)=>{
    // console.log(data)
    // .rows[0]['count'] 
    if(data.rows.length == 0){
        pool.query(`INSERT INTO character (name, image, village_id) VALUES
        ('Sasuke', pg_read_binary_file ('/sasuke.jpeg'), 1),
        ('Gaara', pg_read_binary_file ('/sasuke.jpeg'), 2),
        ('Sakura', pg_read_binary_file ('/sasuke.jpeg'), 1),
        ('Killer Bee', pg_read_binary_file ('/sasuke.jpeg'), 1) RETURNING *`,
        (error, data)=>{
            if(error){
                console.log('Character Insert failed');
            } else {
                console.log(data.rows[0]);
            }
        })
    }
})
// pool.end();