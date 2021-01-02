// const DataTypes = require('sequelize');
// const {Model} = DataTypes;

// module.exports = class Comment extends Model {
//     static init(sequelize){
//         return super.init({
//             //id가 기본적으로 들어있다. 
//             content: {
//                 type: DataTypes.TEXT,
//                 allowNull: false,
//             },
//         },{ 
//             modelName: 'Comment',
//             tableName: 'comments',
//             charset: 'utf8mb4',
//             collate: 'utf8mb4_general_ci',        //한글과 이모티콘까지
//             sequelize,
//         });
//     }

//     static associate(db){
//         db.Comment.belongsTo(db.User);
//         db.Comment.belongsTo(db.Post);
//     }
// }

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {      //mysql에는 comments라고 저장됨 
        //id가 기본적으로 들어있다. 
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',        //한글과 이모티콘까지
    });
    Comment.associate = (db) =>{
        //belongsTo는 따로 UserId, PostId를 만듬
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };

    return Comment;
}