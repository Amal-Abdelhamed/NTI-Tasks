const express = require("express")
const router = express.Router()
const tasksController = require('../controller/tasksController')



router.get("/", tasksController.allTasks)
router.get("/add", tasksController.add)
router.post("/addLogic", tasksController.addLogic)


module.exports = router
