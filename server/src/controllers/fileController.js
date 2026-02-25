// * To upload things to the cloud, it would just be req.file.buffer

export function addSingleFile(req, res, next) {
  res.send({ file: req.file, body: req.body });
}
