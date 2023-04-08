const { MongoClient } = require("mongodb")
const connectDb = (cb) => {
    MongoClient.connect(process.env.dbURL, async (err, client) => {
        if (err) return console.log('connection error');
        const db = client.db(process.env.dbName)
        cb(db)
    })
}

module.exports = connectDb