export = (sequelize:any, Sequelize:any) => {
    const userDetails = sequelize.define("userDetails", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id:{
            allowNull: false,
            type: Sequelize.STRING
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


// @ManyToOne(type => Category)
// @JoinColumn([
//     { name: "category_id", referencedColumnName: "id" },
//     { name: "locale_id", referencedColumnName: "locale_id" }
// ])
// category: Category;

// @ManyToOne(() => DataDictionaryEntry)
// @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
// status: DataDictionaryEntry