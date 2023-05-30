export = (sequelize:any, Sequelize:any) => {
    const User = sequelize.define("Users", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email:{
           allowNull: false,
           type: Sequelize.STRING
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {
        tableName: 'Users',
        timestamps: false,
    });
    return User;
};