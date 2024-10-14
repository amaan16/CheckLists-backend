const express = require("express");
const database = require('./database.js')
const dbWriter = require("./dbWriter");
const cronJob = require("./cronJob");

const port = 5000;
const app = express();

const userRoutes = require('./routes/user');
const todosRoutes = require('./routes/todos');
const cors = require('cors');

database.run();
// database.trial();

app.use(express.json())
app.use(cors());

app.use('/user', userRoutes);
app.use('/todos' , todosRoutes);

app.listen(port,()=> {
    console.log(`Server running on port ${port}`);
    cronJob.cronJobScheduler();
})

app.get("/",(req,res) => {
    res.json({message:"Specify an Endpoint", statusCode: 400})
})


// dbWriter.removeTodo("9a33923b-387c-4625-8b1a-754506f2a64d", 1, "Daily");