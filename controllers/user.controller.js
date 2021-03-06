const Service = require("../services/user.service");
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
      let result = await Service.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onLogin(req, res) {
    try {
      let result = await Service.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onUpdate(req, res) {
    try {
      const result = await Service.update(req.params.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      //res.error(error);
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },

  async onRegister(req, res) {
    try {
      let result = await Service.insert(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
       res
         .status(error.status)
         .json({ status: error.status, message: error.message });
    }
  },

  async onUpdatePassword(req, res) {
    try {
      const result = await Service.updatePassword(req.body);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
};

module.exports = { ...methods };
