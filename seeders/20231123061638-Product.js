'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products',[{
      name:'Sepatu Adidas',
      price:1000000,
      image:'www.google.com',
      UserId:1,
      description:'Brand new in box',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products',[{
      name:'Sepatu Adidas',
      price:1000000,
      image:'www.google.com',
      UserId:1,
      description:'Brand new in box',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
