'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    tittle: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Tittle can not be empty'
        },
        notEmpty:{
          msg: 'Tittle can not be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type:DataTypes.DATEONLY,
      validate:{
        
        isGreaterThan(value){
          if(this.updatedAt.toISOString().split('T')[0] > this.due_date){ 
            throw new Error('the date must be greater than today')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};