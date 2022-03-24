const mongoose = require("mongoose");

const humanSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	message: { type: String, required: true },
	createDate: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Human", humanSchema);
