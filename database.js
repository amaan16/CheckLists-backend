const express = require("express");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://amaan16:Gamer061094@atlascluster.9caurop.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  let retries = 3;
  while (retries > 0) {
    try {
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      return;
    } catch (error) {
      console.error("Connection failed. Retrying...");
      retries--;
      if (retries === 0) {
        console.error("Max retries reached. Unable to connect to MongoDB.");
        throw error;
      }
      // Add a delay before retrying (e.g., using setTimeout)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const DB = client.db("Todos-Project");

const usersCollection = DB.collection("users");

const Schema = MongoClient.Schema;

async function trial(){
  console.log("in Trial");
  try {
    const users = await usersCollection.find({},{ projection: { _id: 0 } }).toArray();
    console.log("in Trial2");
    console.log("Users:", users);
  } catch (err) {
    console.error("Error Retrieving users", err);
  }
}

module.exports = { run,trial };
