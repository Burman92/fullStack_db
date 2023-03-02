const express = require('express');
const app = express();
app.use(express.json());
const port = 8500;
const { Pool } = require('pg');
const DB_HOST = process.env.DATABASE_HOST || 'localhost';
const pool = new Pool({
    user: 'postgres',
    host: DB_HOST,
    database: 'Naruto_Characters',
    password: 'password',
    port: 5438
})

app.get("/N.Char/:N.Char_id/Chars", (req, res, next)=>{
    pool.query('SELECT * FROM N.Char', (error, data)=>{
        if(error){
            return next(error);
        }
        const characters = data.rows
        res.send(characters);
    })
})

app.use((error, req, res, next)=>{
    console.error(error.stack);
    res.status(error.status).send({error: error})
})

app.listen(port, ()=>{
    console.log(`We are live on ${port}!`)
})