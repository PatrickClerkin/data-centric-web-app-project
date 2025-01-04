const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; 

const client = new MongoClient(uri);

let db;

const connectMongo = async () => {
    if (!db) {
        await client.connect();
        db = client.db('proj2024MongoDB');
    }
    return db;
};

module.exports = connectMongo;
