module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {      //mysql에는 posts라고 저장됨 
        //id가 기본적으로 들어있다. 
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',        //한글과 이모티콘까지
    });
    Post.associate = (db) =>{
        db.Post.belongsTo(db.User);          //post.addUser, post.getUser   post.setUser 
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});   //post.addHashtags
        db.Post.hasMany(db.Comment);      //post.addComents, post.getComments
        db.Post.hasMany(db.Image);                                        //post.addImages post.getImages
        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'});  //post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, {as: 'Retweet'});                      //post.addRetweet
    };
    //관계 메서드가 생김 

    return Post;
}