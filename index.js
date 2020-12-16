const mongodb = require("mongodb")
const cors = require("cors")
const express = require("express");
const dotenv = require("dotenv")

const mongoClient = mongodb.MongoClient
const objectId = mongodb.ObjectID
const app = express();
let port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`The app is running on port: ${port}`))
app.use(express.json());
app.use(cors())
dotenv.config()

const url = process.env.DB_URL || 'mongodb://localhost:27017';

app.post("/add-ticket", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("tickets").insertOne(req.body)
        res.status(200).json({
            message :"Ticket added"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to add"
        })
    }
})

app.get("/get-tickets", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("tickets").find().toArray()
        res.status(200).json({
            data : result,
            message : "Recodrs fetched successfully"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching tickets"
        })
    }

})

app.put("/update-ticket/:id", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("tickets").findOneAndUpdate({_id: objectId(req.params.id)}, {$set :req.body})
        res.status(200).json({
            message : "Ticket update"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to update"
        })
    }
})

app.post("/add-contact", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("contacts").insertOne(req.body)
        res.status(200).json({
            message :"Contact added"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to add"
        })
    }
})

app.get("/get-contacts", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("contacts").find().toArray()
        res.status(200).json({
            data : result,
            message : "Recodrs fetched successfully"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching contacts"
        })
    }

})

app.post("/add-agent", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("agents").insertOne(req.body)
        res.status(200).json({
            message :"Agent added"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message: "Not able to add"
        })
    }
})

app.get("/get-agents", async(req, res)=>{
    try{
        let client = await mongoClient.connect(url)
        let db = client.db("ticket_db")
        let result = await db.collection("agents").find().toArray()
        res.status(200).json({
            data : result,
            message : "Recodrs fetched successfully"
        })
        client.close()
    }
    catch(error){
        res.status(500).json({
            message:"Error while fetching agents"
        })
    }

})