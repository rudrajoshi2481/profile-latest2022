import { randomUUID } from "crypto";

export const ImagesUpload = (req: any, res: any) => {
  let { data, name } = req.files.profileImg;
  name = randomUUID() + name;
  let userId = "12346789";
  let mimetype = req.files.profileImg.mimetype.split("/")[1];

  let sampleFile = req.files.profileImg;
  let uploadPath = "uploads/profileImg" + userId + name;

  sampleFile.mv(uploadPath, (err: any) => {
    if (err) return res.status(500).send(err);

    res.send("FILE UPLOAD");
  });

  // res.send("DONE")
};
