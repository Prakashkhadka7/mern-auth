import cloudinary from "../utils/cloudinary.js";
import Image from "../models/image.model.js";
import multer from "multer";

// Multer Setup (For Handling File Uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

// Upload Image to Cloudinary & Save URL to MongoDB
export const uploadImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ success: false, message: "File upload failed" });

    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "practice_project" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(req.file.buffer);
      });

      const newImage = new Image({ imageUrl: result.secure_url });
      await newImage.save();

      res.json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

// Fetch All Images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
