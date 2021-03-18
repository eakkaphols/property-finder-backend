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
      //const myPropertySocket = req.connectedUsers[req.params.id];
      // if (myPropertySocket) {
      //   req.io.to(myPropertySocket).emit("myproperty_response", result);
      // }
      const userid = req.query.user_id;
      if(req.connectedUsers){
        req.io.emit(`myproperty-userid-$userid`, result);
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
      // const myPropertySocket = req.connectedUsers[result.postedBy];
      // if (myPropertySocket) {
      //   req.io.to(myPropertySocket).emit("myproperty_response", rsSocket);
      // }

      const userid = req.query.user_id;
      if(req.connectedUsers){
        req.io.emit(`myproperty-userid-$userid`, rsSocket);
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

      let rsSocket = await Service.findPropertyApproved(req, res);
      req.io.emit("propertylist_response", rsSocket);
      
      res.status(201).json(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onDelete(req, res) {
    try {
      const result = await Service.delete(req.params.id);

      let rsSocket = await Service.findPropertyApproved(req, res);
      req.io.emit("propertylist_response", rsSocket);

      res.status(result.status).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  async onApproval(req, res) {
    try {
      const result = await Service.approval(req.params.id);
      let rsSocket = await Service.findByPostedId(req, result.postedBy);
      // const myPropertySocket = req.connectedUsers[result.postedBy];
      // if (myPropertySocket) {
      //   req.io.to(myPropertySocket).emit("myproperty_response", rsSocket);
      // }
      const userid = req.query.user_id;
      if(req.connectedUsers){
        req.io.emit(`myproperty-userid-$userid`, result);
      }

      let rsSocket2 = await Service.findPropertyApproved(req, res);
      req.io.emit("propertylist_response", rsSocket2);

      res.status(201).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
};

module.exports = { ...methods };
