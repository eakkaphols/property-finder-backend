const Service = require("../services/favorite.service");
const methods = {
  async onGetAll(req, res) {
    try {
      let result = await Service.find(req);
      res.json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onGetById(req, res) {
    try {
      let result = await Service.findById(req, req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onGetByPostedById(req, res) {
    try {
      let result = await Service.findByPostedById(req, req.params.id);

      if (req.params.id) {
        const myPropertySocket = req.connectedUsers[req.params.id];
        if (myPropertySocket) {
          req.io.to(myPropertySocket).emit("myfavorite_response", result);
        }
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
      let result = await Service.insert(req.body);
      if (result.data.postedBy) {
        let rsSocket = await Service.findByPostedById(
          req,
          result.data.postedBy
        );
        const myPropertySocket = req.connectedUsers[result.data.postedBy];
        if (myPropertySocket) {
          req.io.to(myPropertySocket).emit("myfavorite_response", rsSocket);
        }
      }
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
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
      const result = await Service.delete(req.body, req.params.id);

      if (req.body.postedBy) {
        let rsSocket = await Service.findByPostedById(req, req.body.postedBy);
        const myPropertySocket = req.connectedUsers[req.body.postedBy];
        if (myPropertySocket) {
          req.io.to(myPropertySocket).emit("myfavorite_response", rsSocket);
        }
      }

      res.status(result.status).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
};

module.exports = { ...methods };
