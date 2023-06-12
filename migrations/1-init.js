"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "Tags", deps: []
 * createTable "Users", deps: []
 * createTable "URLChecks", deps: [Users]
 * createTable "Reports", deps: [URLChecks]
 *
 **/

var info = {
  revision: 1,
  name: "init",
  created: "2023-06-12T16:37:10.037Z",
  comment: "",
};

var migrationCommands = [
  {
    fn: "createTable",
    params: [
      "Tags",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
          field: "username",
          unique: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        verificationToken: {
          type: Sequelize.STRING,
          field: "verificationToken",
          allowNull: true,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          field: "isVerified",
          defaultValue: false,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "URLChecks",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          field: "url",
          allowNull: false,
        },
        protocol: {
          type: Sequelize.STRING,
          field: "protocol",
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          field: "path",
          allowNull: true,
        },
        port: {
          type: Sequelize.INTEGER,
          field: "port",
          allowNull: true,
        },
        webhook: {
          type: Sequelize.STRING,
          field: "webhook",
          allowNull: true,
        },
        timeout: {
          type: Sequelize.INTEGER,
          field: "timeout",
          defaultValue: 5,
          allowNull: true,
        },
        interval: {
          type: Sequelize.INTEGER,
          field: "interval",
          defaultValue: 600,
          allowNull: true,
        },
        threshold: {
          type: Sequelize.INTEGER,
          field: "threshold",
          defaultValue: 1,
          allowNull: true,
        },
        authenticationUsername: {
          type: Sequelize.STRING,
          field: "authenticationUsername",
          allowNull: true,
        },
        authenticationPassword: {
          type: Sequelize.STRING,
          field: "authenticationPassword",
          allowNull: true,
        },
        ignoreSSL: {
          type: Sequelize.BOOLEAN,
          field: "ignoreSSL",
          defaultValue: false,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        UserId: {
          type: Sequelize.INTEGER,
          field: "UserId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: {
            model: "Users",
            key: "id",
          },
          allowNull: true,
        },
      },
      {},
    ],
  },
  {
    fn: "createTable",
    params: [
      "Reports",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
        },
        status: {
          type: Sequelize.STRING,
          field: "status",
          allowNull: false,
        },
        availability: {
          type: Sequelize.FLOAT,
          field: "availability",
          allowNull: false,
        },
        outages: {
          type: Sequelize.INTEGER,
          field: "outages",
          allowNull: false,
        },
        downtime: {
          type: Sequelize.INTEGER,
          field: "downtime",
          allowNull: false,
        },
        uptime: {
          type: Sequelize.INTEGER,
          field: "uptime",
          allowNull: false,
        },
        responseTime: {
          type: Sequelize.INTEGER,
          field: "responseTime",
          allowNull: false,
        },
        history: {
          type: Sequelize.JSON,
          field: "history",
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        URLCheckId: {
          type: Sequelize.INTEGER,
          field: "URLCheckId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: {
            model: "URLChecks",
            key: "id",
          },
          allowNull: true,
        },
      },
      {},
    ],
  },
];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info,
};
