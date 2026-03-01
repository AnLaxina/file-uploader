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
