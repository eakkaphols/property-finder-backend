const router = require("express").Router();
const controllers = require("../../controllers/post.controller");
//const upload = require("../../configs/multer");
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

router.post("/image-upload", async (req, res, next) => {
  try {
    const file = req.files.photo;
    let upload_len = file.length;
    let upload_res = [];
    for (let i = 0; i <= upload_len - 1; i++) {
      let filePath = file[i];

      await cloudinary.uploader.upload(
        filePath.tempFilePath,
        { use_filename: true, unique_filename: true },
        (err, result) => {
          try {
            upload_res.push(result);
          } catch (err) {
            res.status(err.status).json({
              status: err.status,
              message: err.message,
            });
          }
        }
      );
    }
    console.log(upload_res);
    res.status(200).json({
      message: "Upload image successfully",
      result: upload_res,
    });
  } catch (error) {
    res.status(401).json({ status: 401, message: error.message });
    next(error);
  }
});

router.post("/image-uploadV1", (request, response) => {
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

// /*first route {multiple image upload}*/
// router.post("/multiple_uploads", async (req, res) => {
//   /* we would receive a request of file paths as array */
//   let filePaths = req.body.image;
//   console.log(req.body.image);
//   let multipleUpload = new Promise(async (resolve, reject) => {
//     let upload_len = filePaths.length,
//       upload_res = new Array();

//     for (let i = 0; i <= upload_len + 1; i++) {
//       let filePath = filePaths[i];
//       await cloudinary.v2.uploader.upload(filePath, (error, result) => {
//         if (upload_res.length === upload_len) {
//           /* resolve promise after upload is complete */
//           resolve(upload_res);
//         } else if (result) {
//           /*push public_ids in an array */
//           upload_res.push(result.public_id);
//         } else if (error) {
//           console.log(error);
//           reject(error);
//         }
//       });
//     }
//   })
//     .then((result) => result)
//     .catch((error) => error);

//   let upload = await multipleUpload;
//   res.json({ response: upload });
// });

module.exports = router;
