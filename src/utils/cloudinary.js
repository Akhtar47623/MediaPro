import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File has been uploaded on Cloudinary:");
    response.url();
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // locally saved temporary file as the upload operation got fialed.
    console.log("Error uploading to Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary };
