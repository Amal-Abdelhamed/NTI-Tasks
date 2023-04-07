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
        const id = req.params.id
        const i = allTasks.findIndex(t => t.id != id)
        allTasks.splice(i, 1)
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
    static editBtn = (req, res) => {
        const id = req.params.id
        const allTasks = dbJson.readData(fileName)
        const task = allTasks.find(t => t.id == id)
        res.render("edit",
            { pageTitle: "edit page", task }
        )
    }
    static editLogic = (req, res) => {
        const allTasks = dbJson.readData(fileName)
        const id = req.params.id
        const index = allTasks.findIndex(t => t.id == id)
        allTasks[index] = { id, ...req.query }
        dbJson.writeData(fileName, allTasks)
        res.redirect("/")
    }
// show single task
static showBtn = (req, res) => {
    const id = req.params.id
    const allTasks = dbJson.readData(fileName)
    const task = allTasks.find(t => t.id == id)
    res.render("show",
        { pageTitle: "show task details", task }
    )

}

// activate status

static active = (req, res) => {
    const id = req.params.id
    const allTasks = dbJson.readData(fileName)
    const task = allTasks.find(t => t.id == id)
    task.status = "true"
    dbJson.writeData(fileName, allTasks)
    res.redirect("/")
}




}


module.exports = taskController