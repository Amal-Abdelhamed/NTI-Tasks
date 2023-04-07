const fs = require("fs")
class dbJsonFile {
    static writeData = (fileName, data) => {
        fs.writeFileSync(fileName, JSON.stringify(data))
    }
    static readData = (fileName) => {
        let result
        try {
            result = JSON.parse(fs.readFileSync(fileName))
            console.log(result)
            if (!Array.isArray(result)) throw new Error("not an array")
        }
        catch (e) {
            result = []
        }
        return result
    }
}
module.exports = dbJsonFile
