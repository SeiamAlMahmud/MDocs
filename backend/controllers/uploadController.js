

const fileUploadController = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
    
      // Generate the file URL (adjust as necessary)
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ success: true, fileUrl: fileUrl });
}

module.exports = { fileUploadController }







