const dbJson = require('../helper/dbJsonFile')
const taskModel = require("../../db/models/task.model")

class taskController {

    // render home page 
    static allTasks = async (req, res) => {
        try {
            const allTasks = await taskModel.find()
            res.render("allTasks", {
                pageTitle: "All Tasks",
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
            const data = new taskModel(req.body)
            await data.save()
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }
    // delete task

    static delSingleLogic = async (req, res) => {
        try {
            const d = await taskModel.findByIdAndRemove(req.params.id)
            console.log(d)
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }

    // delete all tasks
    static delAllLogic = async (req, res) => {
        try {
            await taskModel.deleteMany()
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
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }

    // show single task

    static showBtn = async (req, res) => {
        try {
            const task = await taskModel.findById(req.params.id)
            res.render("show", {
                pageTitle: "show Single task",
                task
            })
        }
        catch (e) {
            res.send(e.message)
        }
    }

    // activate status


    static active = async (req, res) => {
        console.log(req.params.id);
        try {
            const task = await taskModel.updateOne(
                { _id: req.params.id },
                { $set: { status: "true" } }
            );
            res.redirect("/")
        }
        catch (e) {
            res.send(e.message)
        }
    }

    // search for task

    static search = async (req, res) => {
        try {
            const searchData = req.query.search
            const allTasks = await taskModel.find({ $or: [{ "title": { $regex: searchData, $options: "i" } }, { "content": { $regex: searchData, $options: "i" } }] })


            res.render("allTasks", {
                pageTitle: "search Tasks",
                allTasks,
                hasData: allTasks.length

            })

        }
        catch (e) {
            res.send(e.message)
        }
    }



}


module.exports = taskController