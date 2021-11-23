'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
   return await queryInterface.createTable('users', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      key_count: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {

    return await queryInterface.dropTable('users');
  
  }
};
