const dbJson = require('../helper/dbJsonFile')
const taskModel = require("../../db/dbConnect")
const fileName = "models/tasks.json"

class taskController {

    // render home page 
    static allTasks = async (req, res) => {
        try {
            const allTasks = await taskModel.find()
            res.render("allTasks", {
                pageTitle: "All Data",
                allTasks,
                hasData: allTasks.length
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }
    // add task
    static add = (req, res) => {
        res.render("add",
            {
                pageTitle: "Add Task"
            }
        )
    }

    static addLogic = async (req, res) => {
        try {
            const data = new (req.body)
            await data.save()
            res.redirect("/")
        }
        catch (e) {
            res.send(e)
        }
    }
    // delete task

    static delSingleLogic = async (req, res) => {
        try {
            connectDb(async (db) =>
                await db.collection("tasks")
                    .deleteOne({ _id: new ObjectId(req.params.id) })
            )
            res.redirect("/")
        }
        catch (e) {
            res.send(e)
        }
    }

    // delete all tasks
    static delAllLogic = async (req, res) => {
        try {
            connectDb(async (db) => await db.collection("tasks").remove())
            res.redirect("/")
        }
        catch (e) {
            res.send(e)
        }
    }


    // edit task


    static editBtn = async (req, res) => {
        try {
            const task = await taskModel.findById(req.params.id)
            res.render("edit", {
                pageTitle: "Edit Data",
                task
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }

    static editLogic = async (req, res) => {
        try {
            const id = req.params.id
            await taskModel.findByIdAndUpdate(id, req.query, { runValidators: true })
            res.redirect(`/single/${id}`)
        }
        catch (e) {
            res.send(e.message)
        }
    }

    // show single task

    static showBtn = async (req, res) => {
        try {
            connectDb(async (db) => {
                const task = await db.collection("tasks").findOne({
                    _id: new ObjectId(req.params.id)
                })
                res.render("show", {
                    pageTitle: "Show Single task",
                    task
                })

            })
        }
        catch (e) {
            res.send(e)
        }
    }

    // activate status


    static active = async (req, res) => {
        try {
            connectDb(async (db) => {
                const task = await db.collection("tasks").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { ...req.query } }, { status: "true" }
                );
                res.send(task)

            })
        }
        catch (e) {
            res.send(e)
        }
    }

    // search for task

    static search = async (req, res) => {
        try {
            const searchData = req.query.search
            connectDb(async (db) => {
                const tasks = await db.collection("tasks").find({ $or: [{ "title": { $regex: searchData, $options: "i" } }, { "content": { $regex: searchData, $options: "i" } }] }).toArray()

                res.render("allTasks", {
                    pageTitle: "search Tasks",
                    allTasks: tasks,
                    hasData: tasks.length

                })
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }



}


module.exports = taskController