const dbJson = require('../helper/dbJsonFile')
const fileName = "models/tasks.json"

class taskController {
    static allTasks = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        res.render("allTasks", {
            pageTitle: "home",
            allTasks,
            hasData: allTasks.length
        })
    }

    static addLogic = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        const newTask = { id: Date.now(), ...req.body }
        console.log(req.body);
        allTasks.push(newTask)
        dbJson.writeData(fileName, allTasks)
        res.redirect("/")
    }

    static add= (req, res) => {
        res.render("add",
            {
                pageTitle: "add page"
            }
        )
    }
}


module.exports = taskController