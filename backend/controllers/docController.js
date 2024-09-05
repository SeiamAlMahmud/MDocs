const Doc = require("../Models/DocModel");
const User = require("../Models/userModel");


const createNewDoc = async (req, res) => {

    const { docName } = req.body;
    const userId = req.userId;
    try {

        if (!userId || !docName) {
            return res.status(404).json({ success: false, error: "Data not found" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, error: "User Data not found." })
        }

        let newDoc = await new Doc({
            uploadBy: user.username,
            userId,
            title: docName
        })

        if (newDoc) {
            user.documents.push(newDoc._id)

            // this will run in parallel
            await Promise.all([newDoc.save(), user.save()]);

            return res.status(201).json({ success: true, message: "New Document created", docId: newDoc._id })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })
    }
}

const updateExistingDoc = async (req, res) => {

    try {

        const { content, docId } = req.body;
        const userId = req.userId;

        const updatedDoc = await Doc.findByIdAndUpdate(
            docId,
            { content },
            { new: true }
        ).select("updatedAt content createdAt")

        if (!updatedDoc) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        return res.status(200).json({ success: true, message: "Document updated", docData: updatedDoc })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

const getDoc = async (req, res) => {

    const { docId } = req.body;

    try {
        if (!docId) {
            return res.status(404).json({ success: false, error: "Document Reference invalid" })
        }

        const gotDoc = await Doc.findById(docId)

        if (!gotDoc) {
            return res.status(404).json({ success: false, error: "Document is not found." })
        }
        return res.status(200).json({ success: true, message: "Document updated", docData: gotDoc })

    } catch (error) {
        
    }
}



const updateExistingTitle = async (req, res) => {

    try {

        const { title, docId } = req.body;
        const userId = req.userId;

        if (!title || !docId ) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        const updatedDoc = await Doc.findByIdAndUpdate(
            docId,
            { title },
            { new: true }
        ).select("updatedAt title")

        if (!updatedDoc) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        return res.status(200).json({ success: true, message: "Document updated", docData: updatedDoc })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

const getDocsViaUser = async (req, res) => {

    const userId = req.userId;

    try {
        if (!userId) {
            return res.status(404).json({ success: false, error: "User not found." })
        }

        const getAllDocs = await User.findById(userId).populate("documents").select("-password")

        if (!getAllDocs) {
            return res.status(404).json({ success: false, error: "Documents are not found." })
        }
        return res.status(200).json({ success: true, message: "", docData: getAllDocs })

    } catch (error) {
        
    }
}

const DeleteDoc = async (req, res) => {

    try {

        const {docId } = req.body;
        const userId = req.userId;

        if (!docId ) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        const updatedDoc = await Doc.findByIdAndDelete(docId).select("updatedAt title")

        if (!updatedDoc) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        await User.updateMany(
            { documents: docId },          // Find users where documents array contains docId
            { $pull: { documents: docId } } // Remove docId from documents array
        );

        return res.status(200).json({ success: true, message: "Document Deleted Successfully"})

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

const updateExistingStatus = async (req, res) => {

    try {

        const { isPublish, docId } = req.body;
        const userId = req.userId;

        if (!isPublish || !docId ) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        const updatedDoc = await Doc.findByIdAndUpdate(
            docId,
            { isPublish },
            { new: true }
        ).select("updatedAt createdAt isPublish")

        if (!updatedDoc) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }

        return res.status(200).json({ success: true, message: "Status updated", docData: updatedDoc })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

module.exports = { createNewDoc, updateExistingDoc, getDoc, updateExistingTitle, getDocsViaUser,DeleteDoc, updateExistingStatus }