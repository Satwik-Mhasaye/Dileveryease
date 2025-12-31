const express = require('express');
const { body, validationResult } = require('express-validator');
const Delivery = require('../models/Delivery');
const Driver = require('../models/Driver');

const router = express.Router();

// Generate unique order ID
function generateOrderId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const timestamp = String(now.getTime()).slice(-4);
  return `SD${year}${month}${day}${timestamp}`;
}

// @route   POST /api/deliveries
// @desc    Create a new delivery booking
// @access  Public
router.post('/', [
  body('customer.firstName').trim().notEmpty().withMessage('First name is required').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('customer.lastName').trim().notEmpty().withMessage('Last name is required').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('customer.email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('customer.phone').trim().notEmpty().withMessage('Phone is required').isLength({ min: 10 }).withMessage('Phone must be at least 10 characters'),
  body('delivery.pickupAddress').trim().notEmpty().withMessage('Pickup address is required').isLength({ min: 10 }).withMessage('Pickup address must be at least 10 characters'),
  body('delivery.dropoffAddress').trim().notEmpty().withMessage('Dropoff address is required').isLength({ min: 10 }).withMessage('Dropoff address must be at least 10 characters'),
  body('delivery.packageType').notEmpty().withMessage('Package type is required').isIn(['document', 'small', 'medium', 'large', 'fragile', 'food']).withMessage('Invalid package type'),
  body('delivery.packageWeight').notEmpty().withMessage('Package weight is required').isFloat({ min: 0.1 }).withMessage('Package weight must be at least 0.1 kg'),
  body('delivery.packageDescription').trim().notEmpty().withMessage('Package description is required').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('delivery.deliveryDate').notEmpty().withMessage('Delivery date is required').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
  body('delivery.deliveryTime').notEmpty().withMessage('Delivery time is required').isIn(['morning', 'afternoon', 'evening', 'anytime']).withMessage('Invalid delivery time')
], async (req, res) => {
  try {
    // Log incoming request
    console.log('Delivery booking request received:', JSON.stringify(req.body, null, 2));
    
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const orderId = generateOrderId();

    // Create delivery object
    const deliveryData = {
      orderId,
      customer: req.body.customer,
      delivery: req.body.delivery,
      additionalServices: req.body.additionalServices || {},
      status: 'booked',
      timestamps: {
        booked: new Date().toLocaleString()
      }
    };

    // Handle driver assignment
    let selectedDriver = null;
    
    // If a specific driver was selected, try to use that one
    if (req.body.selectedDriverId) {
      selectedDriver = await Driver.findById(req.body.selectedDriverId);
      
      if (!selectedDriver) {
        return res.status(400).json({ error: 'Selected driver not found' });
      }
      
      if (!selectedDriver.isAvailable || !selectedDriver.isVerified) {
        return res.status(400).json({ error: 'Selected driver is not available' });
      }
    } else {
      // Otherwise, find any available driver
      selectedDriver = await Driver.findOne({ isAvailable: true, isVerified: true });
    }

    if (selectedDriver) {
      deliveryData.driverId = selectedDriver._id;
      deliveryData.driver = {
        name: `${selectedDriver.firstName} ${selectedDriver.lastName}`,
        phone: selectedDriver.phone,
        vehicle: `${selectedDriver.vehicleType} - ${selectedDriver.licensePlate || 'N/A'}`
      };
      deliveryData.status = 'assigned';
      deliveryData.timestamps.assigned = new Date().toLocaleString();

      // Update driver availability
      selectedDriver.isAvailable = false;
      await selectedDriver.save();
    }

    const delivery = new Delivery(deliveryData);
    delivery.updatedAt = Date.now();
    await delivery.save();

    res.status(201).json({
      success: true,
      message: 'Delivery booked successfully!',
      orderId: orderId,
      delivery: delivery
    });
  } catch (error) {
    console.error('Error creating delivery:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Order ID already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/deliveries/track/:orderId
// @desc    Track a delivery by order ID
// @access  Public
router.get('/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const delivery = await Delivery.findOne({ orderId: orderId.toUpperCase() });

    if (!delivery) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      delivery: {
        orderId: delivery.orderId,
        customer: delivery.customer,
        delivery: delivery.delivery,
        status: delivery.status,
        driver: delivery.driver,
        timestamps: delivery.timestamps,
        additionalServices: delivery.additionalServices
      }
    });
  } catch (error) {
    console.error('Error tracking delivery:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/deliveries/:orderId/status
// @desc    Update delivery status (for drivers/admin)
// @access  Public (should be protected in production)
router.put('/:orderId/status', [
  body('status').isIn(['booked', 'assigned', 'pickedUp', 'inTransit', 'delivered'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId } = req.params;
    const { status } = req.body;

    const delivery = await Delivery.findOne({ orderId: orderId.toUpperCase() });
    if (!delivery) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update status and timestamp
    delivery.status = status;
    delivery.timestamps[status] = new Date().toLocaleString();
    delivery.updatedAt = Date.now();

    // If delivery is completed, make driver available again
    if (status === 'delivered') {
      const driver = await Driver.findOne({
        $or: [
          { phone: delivery.driver.phone },
          { email: { $regex: new RegExp(delivery.driver.name.replace(' ', '.*'), 'i') } }
        ]
      });
      if (driver) {
        driver.isAvailable = true;
        driver.totalDeliveries += 1;
        await driver.save();
      }
    }

    await delivery.save();

    res.json({
      success: true,
      message: 'Delivery status updated successfully',
      delivery: delivery
    });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/deliveries
// @desc    Get deliveries with optional status filter
// @access  Public (should be protected in production)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const deliveries = await Delivery.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: deliveries.length,
      deliveries: deliveries
    });
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/deliveries/driver/:driverId
// @desc    Get deliveries assigned to a specific driver
// @access  Public (should be protected in production)
router.get('/driver/:driverId', async (req, res) => {
  try {
    const { driverId } = req.params;
    const deliveries = await Delivery.find({ driverId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: deliveries.length,
      deliveries: deliveries
    });
  } catch (error) {
    console.error('Error fetching driver deliveries:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
