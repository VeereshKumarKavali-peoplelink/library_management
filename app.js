const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');

const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./databaseConn.js");

const port = process.env.PORT || 8081;

const app = express();

app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

const initializeDbAndServer = async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
      
    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
}

initializeDbAndServer();

module.exports = app;
