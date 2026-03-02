import { prisma } from "../lib/prisma.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

// S3 setup
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// * To upload things to the cloud, it would just be req.file.buffer

export async function addSingleFile(req, res, next) {
  if (!req.body) {
    return res.status(400).send({ message: "Enter a file to upload." });
  }
  const currentDate = new Date();
  const newFileKey = currentDate.getTime() + "-" + req.file.originalname;
  const newFile = await prisma.file.create({
    data: {
      name: req.file.originalname,
      size: req.file.size,
      fileKey: newFileKey,
      ownerId: req.user.id,
      folderId: parseInt(req.body.folderId) || undefined,
      folder: req.body.folderObject || undefined,
    },
  });

  // Upload to Cloudflare
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: newFileKey,
      ContentType: req.file.mimetype,
      Body: req.file.buffer,
    }),
  );

  res.send({
    file: req.file,
    body: req.body,
    message: "File uploaded!",
    // Yeah... have to convert it to a Number as JSON doesn't support BigInts
    newFile: { ...newFile, size: Number(req.file.size) },
  });
}

// * Use the fileKey column from the db to get the key
