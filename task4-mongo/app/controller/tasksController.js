const dbJson = require('../helper/dbJsonFile')
const connectDb = require('../../models/dbConnect')
const fileName = "models/tasks.json"

class taskController {

    // render home page 
    static allTasks = async(req,res)=>{
        try{
            connectDb(async(db)=>{
                const allTasks = await db.collection("tasks").find().toArray()
                res.render("allTasks", {
                    pageTitle:"All Tasks", 
                    allTasks,
                    hasData: allTasks.length
                })
            })
        }
        catch(e){
            res.send(e)
        }
    }

    // add task
    static add = (req, res) => {
        res.render("add",
            {
                pageTitle: "add page"
            }
        )
    }

    static addLogic = async (req, res) => {
        try {
            connectDb(async (db) => {
           const task = await db.collection("tasks").insertOne(req.body)

                res.redirect("/")
            })
        }
        catch (e) {
            res.send(e.message)
        }
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

    // search for task

    static search = async (req, res) => {
        try {
            const searchData = req.query.search
            connectDb(async (db) => {
           const task = await db.collection("tasks").find({$or:[{"title": { $regex: `/${searchData}/`,i }}, {"content": searchData}]}).toArray()

           res.send(task)
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
    
    
   




}


module.exports = taskController