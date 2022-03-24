const express = require("express");
const router = express.Router();
const Human = require("../models/humans");

// GET all
router.get("/", async (req, res) => {
	try {
		const humans = await Human.find();
		res.json(humans);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// GET one
router.get("/:id", getHuman, (req, res) => {
	res.json(res.human);
});

// Create one
router.post("/", async (req, res) => {
	const human = new Human({
		name: req.body.name,
		age: req.body.age,
		message: req.body.message,
	});

	try {
		const newHuman = await human.save();
		res.status(201).json(newHuman);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

// Update one
router.patch("/:id", getHuman, async (req, res) => {
	if (req.body.message) {
		res.human.message = req.body.message;
	} else if (req.body.name || req.body.age) {
		return res.status(400).json({ message: "property cannot be updated" });
	}
	try {
		const updatedHuman = await res.human.save();
		res.json(updatedHuman);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

// Delete one
router.delete("/:id", getHuman, async (req, res) => {
	try {
		await res.human.remove();
		res.json({ message: `Deleted ${res.human.name} from the human res` });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

async function getHuman(req, res, next) {
	let human;
	try {
		human = await Human.findById(req.params.id);
		if (human === null)
			return res.status(404).json({ message: "Cannot find your human" });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
	res.human = human;
	next();
}

module.exports = router;
