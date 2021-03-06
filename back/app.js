const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const db = require('./models');
const passportConfig = require('./passport');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');


dotenv.config();
const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('db연결 성공')
    })
    .catch(console.error);

passportConfig();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,                    //백엔드와 브라우저가 포트가 다르면 쿠키도 전달안됨 => true로 해줘야함
}));

app.use('/', express.static(path.join(__dirname, 'uploads')))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());
//

app.get('/', (req, res) => {
    res.send('hello')
});

app.use('/posts' ,postsRouter);
app.use('/post' ,postRouter);
app.use('/user' ,userRouter);
app.use('/hashtag' ,hashtagRouter);


//애러처리 미들웨어는 기본적으로 존재 (밑에 처럼)
//다른 작업하고 싶을 때 만들어서 사용
// app.use((err,req, res, next) => {

// })

app.listen(3065, () => {
    console.log('서버실행중');
})

// app.put -> 전체 수정
// app.patch -> 부분 수정
// app.options -> 찔러보기 
// app.head -> 헤더만 가져오기

//npx sequelize init   
//npx sequelize db:create