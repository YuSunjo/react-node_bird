const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');

db.sequelize.sync()
    .then(() => {
        console.log('db연결 성공')
    })
    .catch(console.error);

const app = express();

app.get('/', (req, res) => {
    res.send('hello')
});

app.get('/posts', (req, res) => {
    res.json([
        {id: 1, content:'hello1'},
        {id: 2, content:'hello2'},
        {id: 3, content:'hello3'},
    ]);
});

app.use('/post' ,postRouter);

app.listen(3065, () => {
    console.log('서버실행중');
})

// app.put -> 전체 수정
// app.patch -> 부분 수정
// app.options -> 찔러보기 
// app.head -> 헤더만 가져오기

//npx sequelize init   
//npx sequelize db:create