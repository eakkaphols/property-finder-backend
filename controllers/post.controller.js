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
      res.status(201).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onInsertWithImages(req, res) {
    try {
      const result = await Service.insertWithImages(req.body, req.file);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  //   async onUpdate(req, res) {
  //     try {
  //       const result = await Service.update(req.params.id, req.body);
  //       res.success(result);
  //     } catch (error) {
  //       res.error(error);
  //     }
  //   },

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

  //   async onLogin(req, res) {
  //     try {
  //       const result = await Service.login(req.body);
  //       res.success(result);
  //     } catch (error) {
  //       res.error(error);
  //     }
  //   },

  //   onRegister(req, res) {
  //     res.success({ page: "login" });
  //   },
};

module.exports = { ...methods };
