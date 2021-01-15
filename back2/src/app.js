import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/index.js';

class App {
    constructor() {
        this.app = express();

        //미들웨어 세팅
        this.setMiddleWare();

        this.setStatic();

        this.setLocals();

        this.getRouting();

        this.status404();

        this.errorHandler();
    }

    setMiddleWare() {
        this.app.use(express.json());
    }

    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
    }

    setLocals() {

    }

    getRouting() {
        this.app.get('/', (req, res) => {
            res.send('hello');
        })
        this.app.use(router);
    }

    status404 () {

    }

    errorHandler () {
        this.app.use((err, req, res, next) => {

        })
    }
}

export default new App().app;