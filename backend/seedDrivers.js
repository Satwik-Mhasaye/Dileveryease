const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deliveryapp')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schemas directly to avoid pre-save hook issues
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

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'driver' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Driver = mongoose.model('Driver', driverSchema);
const User = mongoose.model('User', userSchema);

const seedDrivers = async () => {
  try {
    const testDrivers = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@deliveryapp.com',
        phone: '+1 (555) 123-4567',
        licenseNumber: 'DL123456789',
        vehicleType: 'van',
        vehicleModel: 'Toyota Hiace',
        licensePlate: 'ABC 123',
        password: 'password123'
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@deliveryapp.com',
        phone: '+1 (555) 234-5678',
        licenseNumber: 'DL987654321',
        vehicleType: 'car',
        vehicleModel: 'Honda Civic',
        licensePlate: 'XYZ 789',
        password: 'password123'
      },
      {
        firstName: 'Mike',
        lastName: 'Wilson',
        email: 'mike.wilson@deliveryapp.com',
        phone: '+1 (555) 345-6789',
        licenseNumber: 'DL456789123',
        vehicleType: 'truck',
        vehicleModel: 'Ford F-150',
        licensePlate: 'DEF 456',
        password: 'password123'
      },
      {
        firstName: 'Emma',
        lastName: 'Brown',
        email: 'emma.brown@deliveryapp.com',
        phone: '+1 (555) 456-7890',
        licenseNumber: 'DL789123456',
        vehicleType: 'bike',
        vehicleModel: 'Yamaha MT-15',
        licensePlate: 'GHI 012',
        password: 'password123'
      }
    ];

    for (const driverData of testDrivers) {
      // Check if driver already exists
      const existingDriver = await Driver.findOne({ email: driverData.email });
      if (existingDriver) {
        console.log(`Driver ${driverData.firstName} ${driverData.lastName} already exists, skipping...`);
        continue;
      }

      // Hash password manually
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(driverData.password, salt);

      // Create driver profile
      const driver = new Driver({
        firstName: driverData.firstName,
        lastName: driverData.lastName,
        email: driverData.email,
        phone: driverData.phone,
        licenseNumber: driverData.licenseNumber,
        vehicleType: driverData.vehicleType,
        vehicleModel: driverData.vehicleModel,
        licensePlate: driverData.licensePlate,
        isAvailable: true,
        isVerified: true,
        rating: 4.8,
        totalDeliveries: Math.floor(Math.random() * 200) + 100
      });

      await driver.save();

      // Create user account for driver
      const user = new User({
        firstName: driverData.firstName,
        lastName: driverData.lastName,
        email: driverData.email,
        phone: driverData.phone,
        password: hashedPassword,
        role: 'driver',
        isVerified: true
      });

      await user.save();

      console.log(`Created driver: ${driverData.firstName} ${driverData.lastName}`);
      console.log(`Login credentials: ${driverData.email} / ${driverData.password}`);
    }

    console.log('\nTest drivers seeded successfully!');
    console.log('You can now login with any of these accounts:');
    console.log('Email: john.smith@deliveryapp.com | Password: password123');
    console.log('Email: sarah.johnson@deliveryapp.com | Password: password123');
    console.log('Email: mike.wilson@deliveryapp.com | Password: password123');
    console.log('Email: emma.brown@deliveryapp.com | Password: password123');

  } catch (error) {
    console.error('Error seeding drivers:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDrivers();
