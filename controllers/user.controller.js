const Service = require("../services/user.service");
const methods = {
  async onGetAll(req, res) {
    try {
      let result = await Service.find(req);
      res.json(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onGetById(req, res) {
    try {
      let result = await Service.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onLogin(req, res) {
    try {
      let result = await Service.login(req.body);
      res.json(result);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...methods };
