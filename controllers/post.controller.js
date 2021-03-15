const Service = require("../services/post.service");

const methods = {
  async onGetAll(req, res) {
    try {
      const result = await Service.find(req);
      res.json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onGetPropertyApproved(req, res) {
    try {
      const result = await Service.findPropertyApproved(req);
      res.json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onGetPropertyPromote(req, res) {
    try {
      const result = await Service.findPropertyPromote(req);
      res.json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onGetById(req, res) {
    try {
      let result = await Service.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onGetByPostedId(req, res) {
    try {
      let result = await Service.findByPostedId(req, req.params.id);
      const myPropertySocket = req.connectedUsers[req.params.id];
      // console.log(myPropertySocket, "88888888888888888888888");

      if (myPropertySocket) {
        //   console.log(myPropertySocket);
        req.io.to(myPropertySocket).emit("myproperty_response", result);
      }

      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onInsert(req, res) {
    try {
      //const result = await Service.insert(req.body);
      const result = await Service.insertWithImages(req.body, req.files);

      let rsSocket = await Service.findByPostedId(req, result.postedBy);
      const myPropertySocket = req.connectedUsers[(req, result.postedBy)];
      if (myPropertySocket) {
        req.io.to(myPropertySocket).emit("myproperty_response", rsSocket);
      }

      res.status(201).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onInsertWithImages(req, res) {
    try {
      const result = await Service.insertWithImages(req.body);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onUpdate(req, res) {
    try {
      const result = await Service.update(req.params.id, req.body);
      res.status(201).json(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onDelete(req, res) {
    try {
      const result = await Service.delete(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onApproval(req, res) {
    try {
      const result = await Service.approval(req.params.postedby);

      // const postingUserSocket = req.connectedUsers[req.params.postedby];
      // if (postingUserSocket) {
      //   req.io.to(postingUserSocket).emit("postapproval_response", result);
      // }
      //console.log("wwwwwww");
      let rsSocket = await Service.findByPostedId(req, req.body.postedBy);
      const myPropertySocket = req.connectedUsers[req.body.postedBy];

      if (myPropertySocket) {
        //console.log(myPropertySocket, "xxxxxxx");
        req.io.to(myPropertySocket).emit("myproperty_response", rsSocket);
      }

      res.status(201).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
};

module.exports = { ...methods };
