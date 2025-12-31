const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deliveryapp')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schema
const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String, required: true, enum: ['bike', 'car', 'van', 'truck'] },
  vehicleModel: { type: String },
  licensePlate: { type: String },
  isAvailable: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  totalDeliveries: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Driver = mongoose.model('Driver', driverSchema);

async function testAPI() {
  try {
    console.log('Testing driver availability...');

    const availableDrivers = await Driver.find({
      isAvailable: true,
      isVerified: true
    }).select('firstName lastName phone vehicleType rating totalDeliveries');

    console.log('Available drivers found:', availableDrivers.length);
    console.log('Drivers:', availableDrivers);

    const response = {
      success: true,
      count: availableDrivers.length,
      drivers: availableDrivers
    };

    console.log('API Response:', JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

testAPI();
