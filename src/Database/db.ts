import { Sequelize, DataType, DataTypes } from 'sequelize'
const sequelize = new Sequelize("MyDB123", "root", "password", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
    }
});
sequelize.authenticate().then(() => {
    console.log('Connected');
}).catch((err) => {
    console.log('Error connecting DB', err);
})
const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("../model/user")(sequelize, DataTypes)
db.userDetails = require("../model/userDetails")(sequelize, DataTypes)

db.User.hasOne(db.userDetails, {
    foreignKey: 'user_id',
    as: 'UserDetails'
})
db.userDetails.belongsTo(db.User, {
    primaryKey: 'id',
    as: 'UserDetails'
})
db.sequelize.sync()
    .then(() => {
        console.log('Sync')
    });
export = db