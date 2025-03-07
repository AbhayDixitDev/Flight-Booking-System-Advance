// src/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    });
    // Remove the local file once uploaded successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Remove the local file if upload fails
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
