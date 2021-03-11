const Post = require("../models/Post"),
  config = require("../configs/app"),
  { ErrorBadRequest, ErrorNotFound } = require("../configs/errorMethods");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const methods = {
  scopeSearch(req) {
    $or = [];
    if (req.query.title) $or.push({ title: { $regex: req.query.title } });
    if (req.query.description)
      $or.push({ description: { $regex: req.query.description } });
    const query = $or.length > 0 ? { $or } : {};
    const sort = { createdAt: -1 };
    if (req.query.orderByField && req.query.orderBy)
      sort[req.query.orderByField] =
        req.query.orderBy.toLowerCase() == "desc" ? -1 : 1;
    return { query: query, sort: sort };
  },

  find(req) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));
    const _q = methods.scopeSearch(req);
    const sort = { createdAt: -1 };

    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Post.find()
            .sort(sort)
            .limit(limit)
            .skip(offset)
            .populate("listingType")
            .populate("propertyType")
            .populate("postedBy")
            .populate("status"),
          Post.countDocuments(),
        ])
          .then((result) => {
            const rows = result[0],
              count = result[1];
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit),
              currPage: +req.query.page || 1,
              rows: rows,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },

  findPropertyApproved(req) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));
    const _q = methods.scopeSearch(req);
    const sort = { createdAt: -1 };

    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Post.find({
            status: "6049d71eae4fb2df678b20f3",
          })
            .sort(sort)
            .limit(limit)
            .skip(offset)
            .populate("listingType")
            .populate("propertyType")
            .populate("postedBy")
            .populate("status"),
          Post.countDocuments({
            status: "6049d71eae4fb2df678b20f3",
          }),
        ])
          .then((result) => {
            const rows = result[0],
              count = result[1];
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit),
              currPage: +req.query.page || 1,
              rows: rows,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },

  findPropertyPromote(req) {
    const limit = +(req.query.size || 10);
    const offset = +(limit * ((req.query.page || 1) - 1));
    const _q = methods.scopeSearch(req);
    const sort = { createdAt: -1 };

    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Post.find({
            isPromote: true,
          })
            .sort(sort)
            .limit(limit)
            .skip(offset)
            .populate("listingType")
            .populate("propertyType")
            .populate("postedBy")
            .populate("status"),
          Post.countDocuments({
            isPromote: true,
          }),
        ])
          .then((result) => {
            const rows = result[0],
              count = result[1];
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit),
              currPage: +req.query.page || 1,
              rows: rows,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },

  findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Post.findById(id)
          .populate("listingType")
          .populate("propertyType")
          .populate("postedBy")
          .populate("status");
        if (!obj) reject(ErrorNotFound("id: not found"));
        resolve(obj.toJSON());
      } catch (error) {
        reject(ErrorNotFound("id: not found"));
      }
    });
  },

  findByPostedId(req, id) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));
    const sort = { createdAt: -1 };
    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Post.find({
            postedBy: id,
          })
            .sort(sort)
            .limit(limit)
            .skip(offset)
            .populate("listingType")
            .populate("propertyType")
            .populate("postedBy")
            .populate("status"),
          Post.countDocuments({
            postedBy: id,
          }),
        ])
          .then((result) => {
            const rows = result[0],
              count = result[1];
            resolve({
              total: count,
              lastPage: Math.ceil(count / limit),
              currPage: +req.query.page || 1,
              rows: rows,
            });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },

  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = new Post(data);
        const inserted = await obj.save();
        resolve(inserted);
      } catch (error) {
        reject(ErrorBadRequest(error.message));
      }
    });
  },
  insertWithImages(data) {
    return new Promise(async (resolve, reject) => {
      let upload_res = [];
      if (data.photo != null) {
        const file = data.photo;
        let upload_len = file.length;

        try {
          if (upload_len > 0) {
            for (let i = 0; i <= upload_len - 1; i++) {
              let filePath = file[i].imagebase64;

              await cloudinary.uploader.upload(
                filePath,
                {  unique_filename: true },
                (err, result) => {
                  try {
                    upload_res.push({
                      asset_id: result.asset_id,
                      url: result.url,
                    });
                  } catch (err) {
                    reject(ErrorBadRequest(err.message));
                  }
                }
              );
            }
          }
          //console.log(upload_res);
        } catch (error) {
          res.status(401).json({ status: 401, message: error.message });
          next(error);
        }
      }

      try {
        data["photo"] = upload_res;
        //console.log(data);
        let obj = new Post(data);
        const inserted = await obj.save();
        resolve(inserted);
      } catch (error) {
        reject(ErrorBadRequest(error.message));
      }
    });
  },
  insertWithImagesV1(data, image) {
    return new Promise(async (resolve, reject) => {
      let upload_res = [];
      if (image != null) {
        const file = image.photo;
        let upload_len = file.length;

        try {
          if (upload_len > 0) {
            for (let i = 0; i <= upload_len - 1; i++) {
              let filePath = file[i];

              await cloudinary.uploader.upload(
                filePath.tempFilePath,
                { use_filename: true, unique_filename: true },
                (err, result) => {
                  try {
                    upload_res.push({
                      asset_id: result.asset_id,
                      url: result.url,
                    });
                  } catch (err) {
                    reject(ErrorBadRequest(err.message));
                  }
                }
              );
            }
          }
          //console.log(upload_res);
        } catch (error) {
          res.status(401).json({ status: 401, message: error.message });
          next(error);
        }
      }

      try {
        data["photo"] = upload_res;
        //console.log(data);
        let obj = new Post(data);
        const inserted = await obj.save();
        resolve(inserted);
      } catch (error) {
        reject(ErrorBadRequest(error.message));
      }
    });
  },

    update(id, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const obj = await Post.findById(id);
          if (!obj) reject(ErrorNotFound("id: not found"));
          await Post.updateOne({ _id: id }, data);
          resolve(Object.assign(obj, data));
        } catch (error) {
          reject(error);
        }
      });
    },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Post.findById(id);
        if (!obj) reject(ErrorNotFound("id: not found"));
        await Post.deleteOne({ _id: id });
        resolve({ status: "200", message: "Succsessfuly Deleted!!!" });
      } catch (error) {
        reject(ErrorNotFound("id: not found"));
      }
    });
  },
};

module.exports = { ...methods };
