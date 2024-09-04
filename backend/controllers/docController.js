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
        ).select("updatedAt content")

        if (!updatedDoc) {
            return res.status(404).json({ success: false, error: "Document not found" })
        }
        
        return res.status(200).json({ success: true, message: "Document updated", docData: updatedDoc })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

module.exports = { createNewDoc, updateExistingDoc }