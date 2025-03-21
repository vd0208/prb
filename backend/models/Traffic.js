const mongoose = require("mongoose");

const TrafficSchema = new mongoose.Schema({
    ip: String,
    page: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Traffic", TrafficSchema);
