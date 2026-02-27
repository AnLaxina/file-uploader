import {prisma} from "../lib/prisma.js";

export async function addSingleFolder(req, res, next) {
    await prisma.folder.create({
        data: {
            name: req.body.folderName,
            ownerId: req.user.id,
            parentFolderId: req.body.parentFolderId
        }
    })

    res.send({message: "Single folder added!"});
}