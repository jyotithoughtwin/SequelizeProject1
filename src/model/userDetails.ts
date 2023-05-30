export = (sequelize:any, Sequelize:any) => {
    const userDetails = sequelize.define("userDetails", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        mobileNumber:{
           allowNull: false,
           type: Sequelize.STRING
        },
        state: {
            allowNull: false,
            type: Sequelize.STRING
        },
        city:{
            allowNull: false,
            type: Sequelize.STRING
        },
        address: {
            allowNull: false,
            type: Sequelize.STRING
        }
    }, {
        tableName: 'userDetails',
        timestamps: false,
    });
    return userDetails;
};

// Jyoti--