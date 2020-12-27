module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {      //mysql에는 users라고 저장됨 
        //id가 기본적으로 들어있다. 
        email: {
            type: DataTypes.STRING(30),       // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATATIME
            allowNull: false,     //필수
            unique: true,         //고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(100),        //암호화 하면 길이가 늘어남 
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',            //한글
    });
    //관계 적어주기   1:1(hasOne,belongsTo)  x:1(hasMany, belongsTo)   x:x(belongsToMany)(새로운 테이블이 생김)  
    User.associate = (db) =>{
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked' });       //이름을 바꿔 줄 수 있음 
        //같은 테이블 일 때 foreignKey 안주면 userId, userId로 햇갈림
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followers', foreignKey: 'FollowingId'});
        db.User.belongsToMany(db.User, {through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'});
    };

    return User;
}