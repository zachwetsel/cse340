const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)

  // Handles if there is no data returned
  if (!data || data.length === 0) {
    const err = new Error("No inventory found for that classification.")
    err.status = 404
    return next(err)
  }

  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInvId(inv_id)

  if (!data) {
    const err = new Error("Vehicle not found.")
    err.status = 404
    return next(err)
  }

  const nav = await utilities.getNav()
  const vehicleDetail = await utilities.buildVehicleDetail(data)

  res.render("./inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    vehicleDetail,
  })
}


module.exports = invCont