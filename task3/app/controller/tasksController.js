const dbJson = require('../helper/dbJsonFile')
const fileName = "models/tasks.json"

class taskController {

    // render home page 
    static allTasks = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        res.render("allTasks", {
            pageTitle: "home",
            allTasks,
            hasData: allTasks.length
        })
    }

    // add task
    static add = (req, res) => {
        res.render("add",
            {
                pageTitle: "add page"
            }
        )
    }

    static addLogic = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        const newTask = { id: Date.now(), ...req.body }
        allTasks.push(newTask)
        dbJson.writeData(fileName, allTasks)
        res.redirect("/")
    }
    // delete task
    static delSingleLogic = (req, res) => {
        let allTasks = dbJson.readData(fileName)
        const id = req.body.id
        allTasks = allTasks.find(t => t.id != id)
        dbJson.writeData(fileName, allTasks)
        res.redirect("/")
    }

    // delete all tasks
    static delAllLogic = (req, res) => {
        let allTasks = dbJson.readData(fileName)
        allTasks.length = 0
        dbJson.writeData(fileName, allTasks)
        res.redirect("/")
    }
    // edit task
    static edit = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        const id = req.body.id
        const task = allTasks.find(t => t.id == id)
        res.render("edit",
            { pageTitle: "edit page", task}
        )
    }
    static editLogic = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        const id = req.body.id
        const task = allTasks.find(t => t.id == id)
        task.title = req.body.title;
        task.content = req.body.content;
        task.dueDate = req.body.dueDate;
        task.status = req.body.status;
        dbJson.writeData(fileName, allTasks)
        res.redirect("/")
    }

}


module.exports = taskController