const sequelize = require('./database/db')
// Import model


// Synchronize models with the database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync all models (this will create tables)
    await sequelize.sync({ force: true }); // `force: true` drops tables before recreating them
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database or synchronize:', error);
  }
};

// Test and sync
syncDatabase();

const Question = require('./database/models/quizeQuestions');
