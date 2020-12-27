module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {      //mysql에는 images라고 저장됨 
        //id가 기본적으로 들어있다. 
        src:{
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',        //한글과 이모티콘까지
    });
    Image.associate = (db) =>{
        db.Image.belongsTo(db.Post);
    };

    return Image;
}