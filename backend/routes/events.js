const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// ✅ CREATE EVENT (ADMIN + IMAGE)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    console.log("FILE:", req.file); // 🔍 debug

    const event = new Event({
      ...req.body,
      image: req.file?.path, // Cloudinary URL
      createdBy: req.user.id,
    });

    await event.save();
    res.json(event);

  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ msg: "Error creating event" });
  }
});

// ✅ GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ GET SINGLE EVENT
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ UPDATE EVENT
router.patch("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.price = req.body.price || event.price;
    event.date = req.body.date || event.date;
    event.time = req.body.time || event.time;
    event.location = req.body.location || event.location;

    if (req.file) {
      event.image = req.file.path;
    }

    await event.save();
    res.json(event);

  } catch (err) {
    console.log("PATCH ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ DELETE EVENT
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Delete error" });
  }
});

module.exports = router;