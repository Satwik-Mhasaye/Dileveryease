const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const email = 'john.smith@deliveryapp.com';
const password = 'password123';

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deliveryapp');
    console.log('Connected to MongoDB');

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found');
      return process.exit(0);
    }

    console.log('User found:', user.email);
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    console.log('Stored hash:', user.password);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

test();
