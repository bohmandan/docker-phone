const {TE, to}              = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Message', {
    name: DataTypes.STRING
  });

  var Model = sequelize.define('User', {
    //first     : DataTypes.STRING,
    Text      : DataTypes.STRING,
    //email     : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "Phone number invalid."} }},
    SenderNumber : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
    //password  : DataTypes.STRING,
});

//   Model.associate = function(models){
//       this.Users = this.belongsToMany(models.User, {through: 'UserCompany'});
//   };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};
