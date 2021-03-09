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

router.post("/imagetest", (req, res) => {
  const file = req.files.photo;
  // upload image here
  cloudinary.uploader
    .upload(file.tempFilePath, { use_filename: true, unique_filename: true })
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

// router.post("/image-stream", (request, response) => {
//   // collected image from a user
//   const data = {
//     image: request.body.image,
//   };

//   // Stream upload
// var upload_stream= cloudinary.uploader.upload_stream({tags: 'basic_sample'},function(err,image) {
//   console.log();
//   console.log("** Stream Upload");
//   if (err){ console.warn(err);}
//   console.log("* Same image, uploaded via stream");
//   console.log("* "+image.public_id);
//   console.log("* "+image.url);
//   waitForAllUploads("pizza3",err,image);
// });
// var file_reader = fs.createReadStream('pizza.jpg').pipe(upload_stream);
// });

//  function waitForAllUploads(id, err, image) {
//    uploads[id] = image;
//    var ids = Object.keys(uploads);
//    if (ids.length == 6) {
//      console.log();
//      console.log(
//        "**  uploaded all files (" + ids.join(",") + ") to cloudinary"
//      );
//      performTransformations();
//    }
//  }

/*first route {multiple image upload}*/
router.post("/multiple_uploads", async (req, res) => {
  /* we would receive a request of file paths as array */
  let filePaths = req.body.image;
  console.log(req.body.image);
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

  let upload = await multipleUpload;
  res.json({ response: upload });
});

module.exports = router;
