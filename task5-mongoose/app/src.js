require("../db/dbConnect")
const taskRoutes = require("./route/task.routes")
const express = require("express")
const hbs = require("hbs")
const path = require("path")
var favicon = require('serve-favicon')


const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const viewDir = path.join(__dirname, "../resources/views")
const parDir = path.join(__dirname, "../resources/layout")
const staticDir = path.join(__dirname, "../resources/public")

app.set("views", viewDir)
app.use(express.static(staticDir))
app.use(favicon(path.join(__dirname, "../resources/public/favicon.ico")))
app.use(taskRoutes)
app.set("view engine", "hbs")
hbs.registerPartials(parDir)


app.all("*", (req, res) => {
    res.render("err404",
        { pageTitle: "err page" }
    )
})
module.exports = app