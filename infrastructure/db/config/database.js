var config = require("config");

module.exports = {
  return config.get("Core.dbConfig");
};
