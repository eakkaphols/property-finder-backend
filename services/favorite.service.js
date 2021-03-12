const Favorite = require("../models/Favorite"),
  config = require("../configs/app"),
  { ErrorBadRequest, ErrorNotFound } = require("../configs/errorMethods");

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

  insert(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Favorite.findOne({ postedBy: data.postedBy });
        if (!obj) {
          Favorite.create(data, function (err, obj) {
            if (err) throw err;
            obj.postedBy = data.postedBy;
            console.log("your favorite has been created!");
            obj.favorites.post.push(data.postId);
            obj.save(function (err, obj) {
              if (err) throw err;
              console.log("Post added");
              resolve(obj);
            });
          });
        } else {
          // see whether this post already exists
          var test = obj.favorites.post.indexOf(data.postId);
          console.log("the test value is  " + test);
          if (test > -1) {
            var err = new Error("This post is already in your favorite list");
            err.status = 401;
            reject(err);
          } else {
            obj.favorites.post.push(data.postId);
            obj.save(function (err, obj) {
              if (err) throw err;
              console.log("This post has been added");
              resolve({
                status: "201",
                message: "Added Succsessfuly !!!",
                data: obj,
              });
            });
          }
        }
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

  // delete(id) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const obj = await Post.findById(id);
  //       if (!obj) reject(ErrorNotFound("id: not found"));
  //       await Post.deleteOne({ _id: id });
  //       resolve({ status: "200", message: "Succsessfuly Deleted!!!" });
  //     } catch (error) {
  //       reject(ErrorNotFound("id: not found"));
  //     }
  //   });
  // },

  findById(req, id) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));
    //const sort = { createdAt: -1 };

    return new Promise(async (resolve, reject) => {
      try {
        Promise.all([
          Favorite.find({
            postedBy: id,
          })
            .populate("postedBy")
            .populate("favorites.post"),
          Favorite.countDocuments({
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

  delete(req, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const obj = await Favorite.findOne({ postedBy: req.postedBy });
        if (!obj) reject(ErrorNotFound("id: not found"));
        if (obj) {
          var index = obj.favorites.post.indexOf(id);
          if (index > -1) {
            obj.favorites.post.splice(index, 1);
          }
          obj.save(function (err, favorite) {
            if (err) throw err;
            resolve({
              status: "200",
              message: "Succsessfuly Deleted!!!",
              data: favorite,
            });
          });
        } else {
          var err = new Error("There' no Favorites");
          err.status = 401;
          reject(err);
        }
      } catch (error) {
        reject(ErrorNotFound("id: not found"));
      }
    });
  },
};

module.exports = { ...methods };
