const { Pool } = require('pg');
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

/*--------------INSERT INTO villages TABLE---------------- */
pool.query(`SELECT * FROM village`,(error, data)=>{
    // .rows[0]['count']
    console.log('test1');
    //i have to figure out how to delete the data if there is any that is in the tables
    // if(data.rows[0]['count'] == 0){
        console.log('test2');
        pool.query(`INSERT INTO village (name) VALUES
        ('leaf'),
        ('sand'),
        ('mist'),
        ('stone'),
        ('cloud') RETURNING *`,
        (error, data)=>{
            if(error){
                console.log('Village Insert failed');
                console.log(error); 
            } else {
                console.log('table has data!')
                console.log(data.rows[0]);
                console.log(data.rows);
            }
        })
        // })
    }
)
/*--------------INSERT INTO CHARACTERS TABLE---------------- */
pool.query(`SELECT * FROM character`,(error, data)=>{
    // console.log(data)
    // .rows[0]['count'] 
    // if(data.rows.length == 0){
        pool.query(`INSERT INTO character (name, main_attack, village_id) VALUES
        ('Sasuke', 'Chidori', 1),
        ('Gaara', 'Sand Coffin' , 2),
        ('Naruto', 'Rasengan', 1),
        ('Guy', 'Them Hands', 1),
        ('Killer Bee', 'Lariat', 5),
        ('Zabuza', 'Water Dragon', 3),
        ('Onoki','Kekkei Tota', 4),
        ('Mei', 'Melting Apprecation', 3),
        ('Guy', 'Them Hands', 1),
        ('Sasori', 'Puppets', 2),
        ('Ay', 'Lightning Armor', 5)
         RETURNING *`,
        (error, data)=>{
            if(error){
                console.log('Character Insert failed');
            } else {
                console.log(data.rows[0]);
                console.log(data.rows[1]);
                console.log('testing');
            }
        })
    
})
// pool.end();