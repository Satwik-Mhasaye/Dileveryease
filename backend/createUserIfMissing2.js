const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const email = 'john.smith@deliveryapp.com';
const password = 'password123';

async function run() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/deliveryapp';
    const conn = await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const usersColl = mongoose.connection.collection('users');
    const existing = await usersColl.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log('User already exists in collection:', existing.email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 12);

    const doc = {
      firstName: 'John',
      lastName: 'Smith',
      email: email.toLowerCase(),
      phone: '+1 (555) 123-4567',
      password: hashed,
      role: 'driver',
      isVerified: true,
      createdAt: new Date()
    };

    const res = await usersColl.insertOne(doc);
    console.log('Inserted user id:', res.insertedId.toString());
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
