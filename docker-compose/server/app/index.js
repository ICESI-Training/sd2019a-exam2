const express = require("express");
const cors = require('cors');
const app = new express();
const mongodb_user = 'root',
    mongodb_user_password = 'ds-exam2',
    database_ip = '127.0.0.1',
    mongos_port = '27017',
    mongodb_database = 'webDatabase',
    mongodb_collection = 'dinosaurs';

const router = express.Router(); // get an instance of the express Router

router.get('/dinosaurs', (req, res) => {
    const MongoClient = require('mongodb').MongoClient;
    const url = `mongodb://${mongodb_user}:${mongodb_user_password}@${database_ip}:${mongos_port}/`;

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db(mongodb_database);
        dbo.collection(mongodb_collection).find({}).toArray((err, result) => {
            if (err) throw err;
            db.close();
            return res.json(result);
        });
    });
});
app.use(cors());
app.use('/api', router);
app.listen("5001");