const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app= express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4cojmrb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const taskCollection = client.db("taskDB").collection("alltask");


    app.post('/alltask', async(req, res)=>{
        const task=req.body;
        const result =await taskCollection.insertOne(task);
        res.send(result);
    });

    app.get('/alltask', async(req,res)=>{
        const cursor =taskCollection.find();
        const result =await cursor.toArray();
        res.send(result);
    })

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('server now running');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });