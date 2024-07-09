const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: props => `${props.value} is not a positive number!`
    }
  },
  type: {
    type: String,
    default: "income"
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 200,  // Increased the maxLength for description
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);
