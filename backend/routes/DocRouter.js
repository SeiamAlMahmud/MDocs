const express = require("express")
const { createNewDoc, updateExistingDoc } = require("../controllers/docController")
const authMiddleware = require("../MiddleWare/authMiddleware")

const router = express.Router()

router.post("/createDoc", authMiddleware, createNewDoc);
router.post("/updateDoc",authMiddleware, updateExistingDoc)


module.exports = router
