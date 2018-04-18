"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

console.log('22222222');

// initialize database connection
var sequelize = new Sequelize(__config.db.name, __config.db.user, __config.db.pass, {
	host: __config.db.host,
	port: __config.db.port,
	dialect: __config.db.dialect,
	omitNull: false,
  alter : true,
  define: {
    collate: 'utf8_general_ci',
    charset:'utf8'
  },
	logging: true
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;