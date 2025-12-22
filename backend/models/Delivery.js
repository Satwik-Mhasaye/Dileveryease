const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  delivery: {
    pickupAddress: { type: String, required: true },
    dropoffAddress: { type: String, required: true },
    packageType: { type: String, required: true },
    packageWeight: { type: Number, required: true },
    packageDescription: { type: String, required: true },
    deliveryDate: { type: String, required: true },
    deliveryTime: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['booked', 'assigned', 'pickedUp', 'inTransit', 'delivered'],
    default: 'booked'
  },
  driver: {
    name: { type: String },
    phone: { type: String },
    vehicle: { type: String }
  },
  additionalServices: {
    insurance: { type: Boolean, default: false },
    signature: { type: Boolean, default: false },
    express: { type: Boolean, default: false }
  },
  timestamps: {
    booked: { type: String },
    assigned: { type: String },
    pickedUp: { type: String },
    inTransit: { type: String },
    delivered: { type: String }
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

// Update the updatedAt field before saving
deliverySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Delivery', deliverySchema);
