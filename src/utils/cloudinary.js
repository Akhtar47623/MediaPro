import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

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
    response.url;
    fs.unlinkSync(localFilePath); // Delete the local file after successful upload
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // locally saved temporary file as the upload operation got fialed.
    console.log("Error uploading to Cloudinary:", error);
    return null;
  }
};

const deleteOldImage = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    const parts = imageUrl.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicId = fileWithExt.split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteOldImage };
