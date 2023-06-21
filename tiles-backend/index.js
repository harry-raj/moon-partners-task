// Main
const express = require('express');
const db = require('./src/db/db.config');
const router = require('./src/routers/index.js');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(router);

const start = async () => {
    try {
        await db.connect();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error("PANIC: Exit with error", e)
        process.exit(0)
    }
};

start()
