const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'hms';

// Create a new MongoClient
const client = new MongoClient(url);

async function connectDB() {
 try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Establish and verify connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");

    // Log a message to confirm the database connection
    console.log("Database connection is established");

    return client.db(dbName);
 } catch (err) {
    console.error("Failed to connect to the database", err);
    throw err;
 }
}


module.exports = connectDB;
