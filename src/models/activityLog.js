const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['CREATE_TODO', 'UPDATE_TODO', 'DELETE_TODO'],
    },
    todo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    snapshot: {
      title: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

module.exports = mongoose.model('ActivityLog', activityLogSchema);
