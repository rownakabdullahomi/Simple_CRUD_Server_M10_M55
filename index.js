const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// rownakdrmc
// VVqyCZlHmC7ZDRaZ


// middleware
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://rownakdrmc:VVqyCZlHmC7ZDRaZ@cluster0.d3h8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Connect to the "insertDB" database and access its "userCollection" collection
        const database = client.db("usersDB");
        const userCollection = database.collection("users");

        app.post("/users", async (req, res) => {
            const user = req.body;
            console.log("New User: ", user);

            // Insert the defined document into the "userCollection" collection
            const result = await userCollection.insertOne(user);

            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Simple CRUD is running")
})

app.listen(port, () => {
    console.log(`Simple CRUD is running on post: ${port}`);
})