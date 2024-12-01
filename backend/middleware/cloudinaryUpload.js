import { v2 as cloudinary } from "cloudinary";

export const cloudinaryUpload = async (req, res, next) => {
  const { image } = req.body;

  if (!image) {
    console.log("No image provided, skipping Cloudinary upload.");
    return next();
  }
  // Cloudinary config
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    timeout: 120000,
  });

  try {
    if (req?.user && req.user.image) {
      await cloudinary.uploader.destroy(
        req.user.image.split("/").pop().split(".")[0]
      );
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "zenstudy",
      timeout: 120000,
    });

    req.secure_url = result.secure_url;
    next();
  } catch (error) {
    console.error("Error in Cloudinary upload", error);
  }
};

export default cloudinaryUpload;
