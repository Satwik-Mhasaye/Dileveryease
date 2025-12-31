const express = require('express');
const Driver = require('../models/Driver');

const router = express.Router();

// @route   GET /api/drivers
// @desc    Get all available drivers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find({ isVerified: true })
      .select('-__v -createdAt -updatedAt')
      .sort({ rating: -1, totalDeliveries: -1 });

    res.json({
      success: true,
      count: drivers.length,
      drivers: drivers
    });
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/drivers/available
// @desc    Get available drivers
// @access  Public
router.get('/available', async (req, res) => {
  try {
    console.log('Fetching available drivers...');
    const availableDrivers = await Driver.find({
      isAvailable: true,
      isVerified: true
    }).select('firstName lastName phone vehicleType rating totalDeliveries');

    console.log('Available drivers query result:', availableDrivers);
    console.log('Number of drivers found:', availableDrivers.length);

    res.json({
      success: true,
      count: availableDrivers.length,
      drivers: availableDrivers
    });
  } catch (error) {
    console.error('Error fetching available drivers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/drivers/:id
// @desc    Get driver by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .select('-__v');

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json({
      success: true,
      driver: driver
    });
  } catch (error) {
    console.error('Error fetching driver:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/drivers/profile/:email
// @desc    Get driver by email
// @access  Public
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const driver = await Driver.findOne({ email: email.toLowerCase() })
      .select('-__v');

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json({
      success: true,
      driver: driver
    });
  } catch (error) {
    console.error('Error fetching driver:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/drivers/:id/verify
// @desc    Verify a driver (admin only)
// @access  Public (should be protected in production)
router.put('/:id/verify', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    driver.isVerified = true;
    await driver.save();

    res.json({
      success: true,
      message: 'Driver verified successfully',
      driver: driver
    });
  } catch (error) {
    console.error('Error verifying driver:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/drivers/:id/location
// @desc    Update driver location
// @access  Public (should be protected in production)
router.put('/:id/location', async (req, res) => {
  try {
    const { currentLocation } = req.body;

    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    driver.currentLocation = currentLocation;
    driver.updatedAt = Date.now();
    await driver.save();

    res.json({
      success: true,
      message: 'Driver location updated successfully',
      driver: driver
    });
  } catch (error) {
    console.error('Error updating driver location:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/drivers/:id/status
// @desc    Update driver availability status
// @access  Public (should be protected in production)
router.put('/:id/status', async (req, res) => {
  try {
    const { isAvailable } = req.body;

    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    driver.isAvailable = isAvailable;
    driver.updatedAt = Date.now();
    await driver.save();

    res.json({
      success: true,
      message: 'Driver status updated successfully',
      driver: driver
    });
  } catch (error) {
    console.error('Error updating driver status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/drivers/seed
// @desc    Seed database with sample drivers
// @access  Public (for development only)
router.post('/seed', async (req, res) => {
  try {
    const sampleDrivers = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@deliveryapp.com',
        phone: '+1 (555) 123-4567',
        licenseNumber: 'DL123456789',
        vehicleType: 'van',
        vehicleModel: 'Toyota Hiace',
        licensePlate: 'ABC 123',
        isAvailable: true,
        isVerified: true,
        rating: 4.8,
        totalDeliveries: 245
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
        isAvailable: true,
        isVerified: true,
        rating: 4.9,
        totalDeliveries: 312
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
        isAvailable: true,
        isVerified: true,
        rating: 4.7,
        totalDeliveries: 189
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
        isAvailable: true,
        isVerified: true,
        rating: 4.6,
        totalDeliveries: 156
      }
    ];

    await Driver.insertMany(sampleDrivers);

    res.json({
      success: true,
      message: 'Sample drivers seeded successfully',
      count: sampleDrivers.length
    });
  } catch (error) {
    console.error('Error seeding drivers:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Some drivers already exist' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
