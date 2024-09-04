const express = require("express")
const { createNewDoc, updateExistingDoc, getDoc } = require("../controllers/docController")
const authMiddleware = require("../MiddleWare/authMiddleware")

const router = express.Router()

router.post("/createDoc", authMiddleware, createNewDoc);
router.post("/updateDoc",authMiddleware, updateExistingDoc)
router.post("/getDoc",authMiddleware, getDoc)




module.exports = router
