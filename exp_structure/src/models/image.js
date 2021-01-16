import { Model, DataTypes } from 'sequelize';

export default class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: 'Image',
        tableName: 'Images',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
}
