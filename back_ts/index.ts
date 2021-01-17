import * as express from 'express';
import { Request, Response, NextFunction, Application} from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';
import { expectCt } from 'helmet';
import { sequelize } from './models';

dotenv.config();
const app: Application = express();
const prod: boolean = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);

sequelize.sync({ force: false })    //테이블을 새로 만들때는 true
.then(() => {
    console.log('db 연결 성공')
})
.catch((err: Error) => {
    console.error(err)
})
if(prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
}else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true,
    }));
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? 'http://localhost:3000' : undefined
    }
}))
app.use(passport.initialize());
app.use(passport.session());



//req: Request   타입 생략가능 
app.get('/',(req: Request, res: Response, next: NextFunction) => {
    res.send('react nodebird');
});

app.listen(app.get('port'), () => {
    console.log(`server is running on ${app.get('port')}`);
})


//npx ts-node index.ts  로 실행
//ts-node는 개발용에서만 사용 
//npx tsc로 

//타입을 찾아감  -> 나중에 커스텀 해야 할 경우 필요함
//npx tsc --traceResolution