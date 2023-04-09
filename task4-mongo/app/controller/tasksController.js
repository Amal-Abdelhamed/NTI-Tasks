
const connectDb = require('../../models/dbConnect')
const ObjectId = require("mongodb").ObjectId


class taskController {

    // render home page 
    static allTasks = async (req, res) => {
        try {
            connectDb(async (db) => {
                const allTasks = await db.collection("tasks").find().toArray()
                const data = allTasks.map((task) => {
                    return {
                        ...task,
                        active : task?.status == "true" ? false : true
                    }
                })
                
                res.render("allTasks", {
                    pageTitle: "All Tasks",
                    allTasks: data,
                    hasData: data.length
                })
            })
        }
        catch (e) {
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
            connectDb(async (db) => {
                const task = await db.collection("tasks").findOne({
                    _id: new ObjectId(req.params.id)
                })
                res.render("edit", {
                    pageTitle: "Single Task",
                    task
                })

            })
        }
        catch (e) {
            res.send(e)
        }
    }
    static editLogic = async (req, res) => {
        try {
            connectDb(async (db) => {
                const task = await db.collection("tasks").updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { ...req.query } }
                    );
                    
                res.redirect("/")
            })
        }
        catch (e) {
            res.send(e)
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
                    { $set:  {status:"true"}}
                );
                res.redirect("/")

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