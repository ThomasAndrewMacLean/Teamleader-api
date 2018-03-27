const mongoose = require('mongoose');

const whnSchema = mongoose.Schema({
    account_id: Number,
    event_type: String,
    object_type: String,
    object_id: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('WebhookNotification', whnSchema);