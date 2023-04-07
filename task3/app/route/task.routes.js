const express = require("express")
const router = express.Router()
const tasksController = require('../controller/tasksController')



router.get("/", tasksController.allTasks)

router.get("/add", tasksController.add)
router.post("/addLogic", tasksController.addLogic)

router.get("/delSingleLogic/:id", tasksController.delSingleLogic)
router.get("/delAllLogic", tasksController.delAllLogic)

router.get("/edit/:id", tasksController.editBtn)
router.get("/editLogic/:id", tasksController.editLogic)

router.get("/show/:id", tasksController.showBtn)

router.get("/activate/:id", tasksController.active)

module.exports = router
