const MongoClient = require('mongodb').MongoClient;
const mongodb_user = 'webUser',
    mongodb_user_password = 'ds-exam2',
    mongodb_admin_user = 'root',
    mongodb_admin_user_password = 'ds-exam2',
    database_ip = 'localhost',
    mongos_port = '27017',
    mongodb_database = 'webDatabase',
    mongodb_collection = 'dinosaurs';
const url = `mongodb://${mongodb_admin_user}:${mongodb_admin_user_password}@${database_ip}:${mongos_port}/`;

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db(mongodb_database);
    /* dbo.createCollection(mongodb_collection, function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    }); */
    const collection = dbo.collection(mongodb_collection);
    collection.deleteMany({})
    collection.insertMany([
        { name: 'Tyrannosaurus', type: "Carnivorous" },
        { name: 'Velociraptor', type: "Carnivorous" },
        { name: 'Spinosaurus', type: "Carnivorous" },
        { name: 'Triceratops', type: "Herbivorous" },
        { name: 'Stegosaurus', type: "Herbivorous" }
    ], (err, result) => { });
    db.close();
});