/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route
app.get("/", baseController.buildHome)
//Intentional error route
app.get("/error", utilities.handleErrors(baseController.triggerError))
// Inventory routes
app.use("/inv", inventoryRoute)
// 404 error handler
app.use(async (req, res, next) => {
  const err = new Error("Sorry, that page does not exist.")
  err.status = 404
  next(err)
})
// General error handler
app.use(async (err, req, res, next) => {
  const nav = await utilities.getNav()
  console.error(`Error at: "${req.originalURL}": ${err.message}`)
  res.status(err.status || 500).render("errors/error", {
    title: err.status ? `${err.status} Error` : "Server Error",
    message: err.message || "Sorry, an unexpected error occurred.",
    nav,
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
