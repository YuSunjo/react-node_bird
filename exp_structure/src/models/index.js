import Sequelize from 'sequelize';
import comment from '@src/models/comment';
import hashtag from '@src/models/hashtag';
import image from '@src/models/image';
import post from '@src/models/post';
import user from '@src/models/user';

// const env = process.env.NODE_ENV || 'development';
import config from '@src/config/config';
// const config = require('@src/config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

// const Sequelize = require('sequelize');
// const comment = require('./comment');
// const hashtag = require('./hashtag');
// const image = require('./image');
// const post = require('./post');
// const user = require('./user');

// const env = process.env.NODE_ENV || 'development';
// const config = require('../config/config')[env];
// const db = {};

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

// db.Comment = comment;
// db.Hashtag = hashtag;
// db.Image = image;
// db.Post = post;
// db.User = user;

// Object.keys(db).forEach((modelName) => {
//   db[modelName].init(sequelize);
// });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
