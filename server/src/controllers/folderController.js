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
  if (!req.body) {
    return res.status(400).send({ message: "Enter the folder id." });
  }
  const selectedFolderId = req.body.selectedFolderId;
  await prisma.folder.delete({
    where: {
      id: selectedFolderId,
    },
  });

  return res.send({ message: "Folder deleted!" });
}

export async function updateSingleFolder(req, res, next) {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Enter the folder id and/or the updated name." });
  }
  const selectedFolderId = req.body.selectedFolderId;
  const updatedFolderName = req.body.updatedFolderName;

  const updatedFolder = await prisma.folder.update({
    where: { id: selectedFolderId },
    data: { name: updatedFolderName },
  });

  return res.send({ message: "Folder updated!", folder: updatedFolder });
}
