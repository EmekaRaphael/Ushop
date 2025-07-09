import express from "express";
import dotenv from "dotenv";
import { verifyTokenAndAdmin } from "./verifyToken.js";

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();
const router = express.Router();

const s3 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: "eu-central-003",
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

router.post("/presigned-url", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "Missing fileName or fileType" });
    }

    const key = `${Date.now()}-${fileName.replace(/\s+/g, "_")}`;

    const command = new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });

    const fileURL = `${process.env.B2_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${key}`;

    res.status(200).json({ uploadURL, fileURL, key });
  } catch (err) {
    console.error("❌ Failed to generate presigned URL:", err);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

router.get("/signed-view-url", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { key } = req.query;
    if (!key) return res.status(400).json({ error: "Missing key parameter" });

    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key,
    });

    const signedGetURL = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

    res.status(200).json({ signedGetURL });
  } catch (err) {
    console.error("❌ Failed to generate signed GET URL:", err);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
});


export { router };