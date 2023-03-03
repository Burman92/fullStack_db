const express = require('express');
const app = express();
app.use(express.json());
const port = 8100;
const { Pool } = require('pg');
const DB_HOST = process.env.DATABASE_HOST || "127.0.0.1";
const cors = require('cors')
app.use(cors())
const pool = new Pool({
    user: 'postgres',
    host: DB_HOST,
    database: 'NarutoCharacters',
    password: 'password',
    port: 5432
})
/*-----------------All Get villages----------------- */
app.get("/api/villages", (req, res, next)=>{
    console.log('GET api/villages') 
    pool.query('SELECT * FROM village', (error, data)=>{
        if(error){
            return next(error);
        }
        console.log('test')
        const villages = data.rows
        res.send(villages);
    })
})
/*-----------------All Get characters----------------- */
app.get("/api/characters", (req, res, next)=>{
    // console.log('GET api/villages') 
    pool.query('SELECT * FROM characters', (error, data)=>{
        if(error){
            return next(error);
        }
        console.log('test')
        const villages = data.rows
        res.send(villages);
    })
})
/*-----------------Specific GET for villages----------------- */
app.get("/api/villages/:id", (req, res, next)=>{
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM village WHERE id = $1', [id], (error, data)=>{
        if(!Number.isInteger(id)){
            res.status(404).send('No village found with that id')
        }
        if(error){
            return next(error);
        }
        const villages = data.rows[0]
        if(villages){
        res.send(villages);
        } else{
           res.status(404).send('No village found with that id') 
        }
    })
})
/*-----------------Specific GET for character----------------- */
app.get("/api/characters/:id", (req, res, next)=>{
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM characters WHERE id = $1', [id], (error, data)=>{
        if(!Number.isInteger(id)){
            res.status(404).send('No ninja found with that id')
        }
        if(error){
            return next(error);
        }
        const villages = data.rows[0]
        if(villages){
        res.send(villages);
        } else{
           res.status(404).send('No ninja found with that id') 
        }
    })
})

/*-----------------delete--------------- */
app.delete("/api/characters/:id",(req, res, next)=>{
    const id = parseInt(req.params.id);
    pool.query("DELETE FROM characters WHERE id =$1 RETURNING *", [id], (error,data)=>{
        if(error){
            res.status(404).send("'You are already in my genjutsu' -Itachi")
        }
        const killed = data.rows[0];
        if(killed){
            res.send(killed)
        } else{
            res.status(404).send("'You are already in my genjutsu' -Itachi");
        }
    })
})
/*--------------------post for characters----------------------- */
app.post("/api/characters",(req, res, next) => {
    const name = req.body.name;
    const village_id = Number.parseInt(req.body.village_id);
    if(!name || !village_id){
        return res.status(400).send("'You are already in my genjutsu' -Itachi");
    } else {
        pool.query('INSERT INTO characters (name, village_id) VALUES ($1, $2) RETURNING *;', [name, village_id], (error, data)=>{
            if(error){
                return next(error);
            }
            let newCharacter = data.rows[0];
            res.status(200).send(newCharacter);
        })
    }
})

/*--------------------patch for characters---------------------- */
app.patch("/api/characters/:id",(req,res,next)=>{
    const id = Number.parseInt(req.params.id);
    const name = req.body.name;
    const village_id = Number.parseInt(req.body.village_id);
    pool.query("SELECT * FROM characters WHERE id =$1", [id], (error, data)=>{
        if(error){
            return res.status(404).send("'You are already in my genjutsu' -Itachi");
        }
        const update = data.rows[0];
        if(!update){
            res.status(404).send("'You are already in my genjutsu' -Itachi")
                }
                const updatedName = name || update.name;
                const updateVillage = village_id || update.village_id;
    pool.query('UPDATE characters SET name = $1, village_id = $2 WHERE id = $3', [updatedName, updateVillage, id], (error, information)=>{
        if(error){
            return res.status(404).send("'You are already in my genjutsu' -Itachi");
        }
        res.send(information.rows[0]);
    })
    })
})

app.use((error, req, res, next)=>{
    console.error(error.stack);
    res.status(404).send({error: error})
})

app.listen(port, ()=>{
    console.log(`We are live on ${port}!`)
    console.log('db host: ', DB_HOST)
})