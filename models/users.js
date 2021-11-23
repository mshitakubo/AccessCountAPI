module.exports = (sequelize, DataType) => {

    const users = sequelize.define('users', {
        email:{
            type:DataType.STRING,
            allowNull: false 
        },
        password: {
            type:DataType.STRING,
            allowNull: false 
        },
        key_count: {
            type:DataType.STRING,
            allowNull: false 
        },
    },{
        tableName:'users',
        timestamps: true
        }
    );

    return users
}