const express = require('express');
const { MongoClient,ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// connect mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a9icx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        
        await client.connect();
        const database = client.db("travelUsers");
        const myObjects = database.collection("travels");
        // data get
        app.get('/datas', async (req, res) => {
            const inter = myObjects.find({})
            const user = await inter.toArray()
            res.send(user)
        })

        // data single get 
        app.get('/datas/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const quary = { _id: ObjectId(id) }
            const result = await myObjects.findOne(quary)
            res.send(result)
        })
        //put api 
        app.put('/datas/:id', async (req, res) => {
            const id = req.params.id;
            const quare = { _id: ObjectId(id) }
            const data = req.body
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    title: data.title,
                    img: data.img,
                    ticket: data.ticket,
                    hotelP: data.hotelP,
                    discription: data.discription,
                    date: data.date,
                },
            };
            console.log("data", data)
            const result = await myObjects.updateOne(quare, updateDoc, options)
            console.log('updating users', id)
            res.json(result)
        })
        // data post
        app.post('/datas', async (req, res) => {
            console.log(req.body)
            const result = await myObjects.insertOne(req.body)
            res.json('result')
        })
        //delete user
        app.delete('/data/:id', async (req, res) => {
            const id = req.params.id;
            const quare = { _id: ObjectId(id) }
            const result = await myObjects.deleteOne(quare)
            res.json(result)

        })
        
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
    }
    run().catch(console.dir);


app.get( '/', (req, res) =>{
    const mess = `<h1 style="font-size: 120px ; text-align: center; align-items: center; line-height: 600px; color: #234076 ">#~ Server Running ~#</h1>`
    res.send(mess);
});

app.listen( port, ()=>{
    console.log("Server Runnign")
})