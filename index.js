const express = require('express');
const { MongoClient } = require('mongodb');
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
        const database = client.db('travelUsers');
        const userCollection = database.collection('travels');

        // Query for a movie that has the title 'Back to the Future'
        // const query = { title: 'Back to the Future' };
        // const movie = await movies.findOne(query);
        // console.log(userCollection);
        const cursor = await userCollection.find({}).toArray();

        app.get('/alloffers', (req, res) =>{
            res.send(cursor)
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