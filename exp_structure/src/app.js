import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/index';
import db from '@src/models';
import cors from 'cors';
import passportConfig from '@src/passport/index';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
// const db = require('@src/models');

class App {
  constructor() {
    this.app = express();

    //dbsync
    this.setDatabase();

    //미들웨어 세팅
    this.setMiddleWare();

    //정적 디렉토리 추가
    this.setStatic();

    //로컬 변수
    this.setLocals();

    //라우팅
    this.getRouting();

    //404 페이지
    this.status404();

    //error
    this.errorHandler();
  }

  setDatabase() {
    db.sequelize
      .sync()
      .then(() => {
        console.log('연결성공');
      })
      .catch(console.error);
  }

  setMiddleWare() {
    passportConfig();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: '*',
        credentials: false,
      })
    );
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(
      session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  setStatic() {
    this.app.use('/uploads', express.static('uploads'));
  }

  setLocals() {}

  getRouting() {
    this.app.get('/', (req, res) => {
      res.send('hello');
    });
    this.app.use(router);
  }

  status404() {}

  errorHandler() {
    this.app.use(() => {});
  }
}

export default new App().app;
