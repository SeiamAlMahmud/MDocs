const express = require("express")
const { createNewDoc, updateExistingDoc, getDoc, updateExistingTitle, getDocsViaUser, DeleteDoc, updateExistingStatus, getForPublic, searchDoc,  } = require("../controllers/docController")
const authMiddleware = require("../MiddleWare/authMiddleware")

const router = express.Router()

router.post("/createDoc", authMiddleware, createNewDoc);
router.post("/updateDoc",authMiddleware, updateExistingDoc)
router.post("/getDoc",authMiddleware, getDoc)
router.post("/updateTitle",authMiddleware, updateExistingTitle)
router.post("/getDocViaUser",authMiddleware, getDocsViaUser)
router.post("/deleteDoc",authMiddleware, DeleteDoc)
router.post("/deleteDoc",authMiddleware, DeleteDoc)
router.post("/updateStatus",authMiddleware, updateExistingStatus)
router.post("/forpublic", getForPublic)
router.post("/search",authMiddleware, searchDoc)



module.exports = router
