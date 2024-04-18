const express = require("express");
const redis = require("redis");

const app = express();

const redisClient = redis.createClient({
    host: "localhost",
    port: 6379,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
app.get('/', async (req, res) => {
    try {
        const data = await redisClient.get("emin");
        console.log(data);
        res.send('Hello world!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});