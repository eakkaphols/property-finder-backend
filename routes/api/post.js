const router = require("express").Router();
const controllers = require("../../controllers/post.controller");
const upload = require("../../configs/multer");
const cloudinary = require("../../configs/cloudinary");
// const config = require("../../configs/app");
const fs = require("fs");

/* GET Posts listing. */
router.get("/", controllers.onGetAll);
/* GET Post by id. */
router.get("/:id", controllers.onGetById);
/* Post insert post. */
router.post("/", controllers.onInsert);
// router.put("/:id", controllers.onUpdate);
// router.delete("/:id", controllers.onDelete);

router.post("/image-upload", (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  };

  // upload image here
  cloudinary.uploader
    .upload(data.image, { use_filename: true, unique_filename: true })
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});

router.post("/upload-images", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      message: "images uploaded successfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`,
    });
  }
});

/*first route {multiple image upload}*/
router.post("/multiple_uploads", async (req, res) => {
  /* we would receive a request of file paths as array */
  let filePaths = req.body.filePaths;

  let multipleUpload = new Promise(async (resolve, reject) => {
    let upload_len = filePaths.length,
      upload_res = new Array();

    for (let i = 0; i <= upload_len + 1; i++) {
      let filePath = filePaths[i];
      await cloudinary.v2.uploader.upload(filePath, (error, result) => {
        if (upload_res.length === upload_len) {
          /* resolve promise after upload is complete */
          resolve(upload_res);
        } else if (result) {
          /*push public_ids in an array */
          upload_res.push(result.public_id);
        } else if (error) {
          console.log(error);
          reject(error);
        }
      });
    }
  })
    .then((result) => result)
    .catch((error) => error);

  /*waits until promise is resolved before sending back response to user*/
  let upload = await multipleUpload;
  res.json({ response: upload });
});

module.exports = router;
