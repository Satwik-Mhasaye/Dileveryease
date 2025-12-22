const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const email = 'john.smith@deliveryapp.com';
const password = 'password123';

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deliveryapp');
    console.log('Connected to MongoDB');

    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      console.log('User already exists:', user.email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 12);

    user = new User({
      firstName: 'John',
      lastName: 'Smith',
      email: email.toLowerCase(),
      phone: '+1 (555) 123-4567',
      password: hashed,
      role: 'driver',
      isVerified: true
    });

    await user.save();
    console.log('Created user:', user.email);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
