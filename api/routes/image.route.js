import express from "express";
import { uploadImage, getImages } from "../controllers/image.controller.js";

const router = express.Router();

router.post("/upload", uploadImage);
router.get("/", getImages);

export default router;
