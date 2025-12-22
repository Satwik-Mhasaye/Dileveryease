const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['bike', 'car', 'van', 'truck']
  },
  vehicleModel: {
    type: String,
    trim: true
  },
  licensePlate: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 5.0
  },
  totalDeliveries: {
    type: Number,
    default: 0
  },
  currentLocation: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Note: Removed problematic pre-save hook that was causing errors

// Virtual for full name
driverSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to assign delivery
driverSchema.methods.assignDelivery = function(deliveryId) {
  this.isAvailable = false;
  return this.save();
};

// Method to complete delivery
driverSchema.methods.completeDelivery = function() {
  this.isAvailable = true;
  this.totalDeliveries += 1;
  return this.save();
};

module.exports = mongoose.model('Driver', driverSchema);
