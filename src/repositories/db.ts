import {MongoClient} from 'mongodb'

export type ProductType = {
    id: number
    title: string
}

const mongoUri =
    process.env.mongoURI || "mongodb+srv://vladzasko:<FKSdwWJieyi7AM6u>@cluster0.msxlf7v.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(mongoUri)
const db = client.db('products');
export const productsCollection = db.collection<ProductType>("products");

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("products").command({ping: 1});
        console.log("Connected successfully to mongo server");

    } catch {
        console.log("Can't connect to db")
        //Ensurens that the client will close when you finish/error
        await client.close();
    }
}