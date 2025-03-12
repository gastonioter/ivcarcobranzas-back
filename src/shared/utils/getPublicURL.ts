import { v2 as cloudinary } from "cloudinary";

export const getPublicURL = async (filePath: string, docName?: string) => {
  const result = await cloudinary.uploader.upload(
    filePath,
    {
      resource_type: "raw",
      public_id: docName ? docName : `documento-${Date.now()}`,
    },
    () => {},
  );

  return result.secure_url;
};
