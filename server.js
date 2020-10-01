const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("Connected to db")
)

// Middleware
app.use(express.json())
app.use(cors())

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


app.listen(port, () => console.log(`server listening on port ${port}`))
