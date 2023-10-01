const express = require("express");
const database = require('./database.js')
const port = 5000;
const app = express();

const userRoutes = require('./routes/user');
const todosRoutes = require('./routes/todos');

database.run();
// database.trial();

app.use(express.json())

app.use('/user', userRoutes);
// app.use('/user' , userRoutes);
// app.use('/todos' , todosRoutes);

app.listen(port,()=> {
    console.log(`Server running on port ${port}`);
})

app.get("/",(req,res) => {
    res.json({message:"Specify an Endpoint", statusCode: 400})
})