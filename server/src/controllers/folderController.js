import { prisma } from "../lib/prisma.js";

export async function addSingleFolder(req, res, next) {
  if (!req.body) {
    return res.status(400).send({ message: "You didn't put anything!" });
  }
  await prisma.folder.create({
    data: {
      name: req.body.folderName,
      ownerId: req.user.id,
      parentFolderId: req.body.parentFolderId,
    },
  });

  return res.send({ message: "Single folder added!" });
}

export async function getAllFoldersByOwnerId(req, res, next) {
  const folders = await prisma.folder.findMany({
    where: { ownerId: req.user.id },
  });

  return res.send({ folders: folders });
}

export async function deleteSingleFolder(req, res, next) {
  if (!req.params) {
    return res.status(400).send({ message: "Enter the folder id." });
  }
  // Here, I'll check if any files exist inside a folder. If so, don't delete
  const currentFolder = await prisma.file.findMany({
    where: {
      folderId: Number(req.params.folderId),
      ownerId: Number(req.user.id),
    },
  });

  const convertedFiles = currentFolder.map((file) => {
    return { ...file, size: Number(file.size) };
  });

  if (convertedFiles.length !== 0) {
    return res.status(406).send({
      message:
        "Folder still has files. Delete them first before deleting a folder!",
    });
  }

  await prisma.folder.delete({
    where: {
      id: Number(req.params.folderId),
      ownerId: Number(req.user.id),
    },
  });

  return res.status(201).send({ message: "Folder deleted!" });
}

export async function updateSingleFolder(req, res, next) {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Enter the folder id and/or the updated name." });
  }

  const folderId = Number(req.params.folderId);
  const updatedFolderName = req.body.updatedFolderName;

  const updatedFolder = await prisma.folder.update({
    where: { id: folderId },
    data: { name: updatedFolderName },
  });

  return res.send({ message: "Folder updated!", folder: updatedFolder });
}
