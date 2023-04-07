const express = require("express")
const router = express.Router()
const tasksController = require('../controller/tasksController')



router.get("/", tasksController.allTasks)

router.get("/add", tasksController.add)
router.post("/addLogic", tasksController.addLogic)

router.get("/delSingleLogic/:id", tasksController.delSingleLogic)
router.get("/delAllLogic", tasksController.delAllLogic)

router.post("/edit", tasksController.edit)
router.post("/editLogic/:id", tasksController.editLogic)

module.exports = router
