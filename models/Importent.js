const mongoose = require('mongoose');

const importentSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ImportentTasks = mongoose.model('ImportentTasks', importentSchema);

module.exports = ImportentTasks;
