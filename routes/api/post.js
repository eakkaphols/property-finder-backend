const router = require("express").Router();
const controllers = require("../../controllers/post.controller");
//const upload = require("../../configs/multer");
const cloudinary = require("../../configs/cloudinary");
// const config = require("../../configs/app");
var buffer = require("buffer");
var path = require("path");
const fs = require("fs");

/* GET Posts listing. */
router.get("/", controllers.onGetAll);
/* GET Posts listing approved. */
router.get("/propertylist", controllers.onGetPropertyApproved);
/* GET Posts listing approved. */
router.get("/promotelist", controllers.onGetPropertyPromote);
/* GET Post by postedById. */
router.get("/postedby/:id", controllers.onGetByPostedId);
/* GET Post by id. */
router.get("/:id", controllers.onGetById);
/* Post insert post. */
router.post("/", controllers.onInsert);
/* Post insert post. */
//router.post("/insert", controllers.onInsertWithImages);

/* Post update post. */
router.put("/:id", controllers.onUpdate);

/* Post delete post. */
router.delete("/:id", controllers.onDelete);

/*Post Approved*/
router.post("/:id/approvals", controllers.onApproval);

/*Post Reject*/
router.post("/:id/rejections", controllers.onRejection);

/*Post Promote*/
router.post("/:id/promote", controllers.onPromote);

// router.post("/image-upload", async (req, res, next) => {
//   try {
//     const file = req.files.photo;
//     let upload_len = file.length;
//     let upload_res = [];
//     for (let i = 0; i <= upload_len - 1; i++) {
//       let filePath = file[i];

//       await cloudinary.uploader.upload(
//         filePath.tempFilePath,
//         { use_filename: true, unique_filename: true },
//         (err, result) => {
//           try {
//             upload_res.push({ asset_id: result.asset_id, url: result.url });
//           } catch (err) {
//             res.status(err.status).json({
//               status: err.status,
//               message: err.message,
//             });
//           }
//         }
//       );
//     }
//     console.log(upload_res);
//     res.status(200).json({
//       message: "Upload image successfully",
//       result: upload_res,
//     });
//   } catch (error) {
//     res.status(401).json({ status: 401, message: error.message });
//     next(error);
//   }
// });

// router.post("/image-uploadV1", (request, response) => {
//   // collected image from a user
//   const data = {
//     image: request.body.image,
//   };

//   // upload image here
//   cloudinary.uploader
//     .upload(data.image, { use_filename: true, unique_filename: true })
//     .then((result) => {
//       response.status(200).send({
//         message: "success",
//         result,
//       });
//     })
//     .catch((error) => {
//       response.status(500).send({
//         message: "failure",
//         error,
//       });
//     });
// });

// router.post("/image64", (request, response) => {
//   // collected image from a user
//   const data = {
//     image: request.body.image,
//   };

//   // upload image here
//   cloudinary.uploader
//     .upload(data.image, {
//       unique_filename: true,
//     })
//     .then((result) => {
//       response.status(200).send({
//         message: "success",
//         result,
//       });
//     })
//     .catch((error) => {
//       response.status(500).send({
//         message: "failure",
//         error,
//       });
//     });
// });

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
}

function decode_base64(base64str, filename) {
  var buf = Buffer.from(base64str, "base64");

  fs.writeFile(
    path.join(__dirname, "/public/", filename),
    buf,
    function (error) {
      if (error) {
        throw error;
      } else {
        console.log("File created from base64 string!");
        return true;
      }
    }
  );
}

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
