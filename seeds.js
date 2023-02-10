require('dotenv').config()

const mongoose = require('mongoose');

const User = require('./models/User.model');

// ℹ️ Connects to the database

// User.collection.drop();

const fakeUsers = [
  {
    username: 'amartin07'
  },
  {
    username: 'luca85'
  },
  {
    username: 'madmax'
  }
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);

    // Create new documents in the books collection
    return User.create(fakeUsers)
  })
  .then(dbUsers => {
    console.log(`Created ${dbUsers.length} users`);
    return mongoose.connection.close();
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!');
  })
  .catch(err => {
    console.log(`An error occurred while creating fake users in the DB: ${err}`);
  });

