const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    url: String,
    reviews: Number,
    rating: Number,
    source: String
});

module.exports = mongoose.model("Product", ProductSchema);
