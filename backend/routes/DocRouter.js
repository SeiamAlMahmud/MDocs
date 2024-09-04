const express = require("express")
const { createNewDoc } = require("../controllers/docController")
const authMiddleware = require("../MiddleWare/authMiddleware")

const router = express.Router()

router.post("/createDoc", authMiddleware, createNewDoc)


module.exports = router
