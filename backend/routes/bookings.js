const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");
const auth = require("../middleware/auth");
const generateQR = require("../utils/qrcode");
const sendMail = require("../utils/mailer");

// CREATE BOOKING
router.post("/create", auth, async (req, res) => {
  try {
    const { eventId, paymentId } = req.body;

    const event = await Event.findById(eventId);
    const user = await User.findById(req.user.id);

    const qrData = {
      userId: user._id,
      eventId,
      paymentId,
    };

    const qrCode = await generateQR(qrData);

    const booking = new Booking({
      user: user._id,
      event: eventId,
      paymentId,
      qrCode,
    });

    await booking.save();

    // Send email
    await sendMail(
      user.email,
      "🎟️ Your Event Ticket",
      `<h2>${event.title}</h2>
       <p>Location: ${event.location}</p>
       <img src="${qrCode}" />`
    );

    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MY BOOKINGS
router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("event");
  res.json(bookings);
});

module.exports = router;