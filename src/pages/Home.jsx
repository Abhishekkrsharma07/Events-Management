import { useEffect, useState } from "react";
import API from "../api/axios";
import HandpickedCollections from "./HandpickedCollections";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then((res) => setEvents(res.data));
  }, []);

  async function handlePayment(event) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const { data } = await API.post("/payment/create-order", {
        eventId: event._id,
      });

      const options = {
        key: "rzp_test_SaxjDz6KEIXqUV",
        amount: data.amount,
        currency: "INR",
        name: event.title,
        order_id: data.id,

        handler: async function (response) {
          console.log("PAYMENT RESPONSE:", response);

          try {
            await API.post("/payment/verify", response);

            await API.post("/bookings/create", {
              eventId: event._id,
              paymentId: response.razorpay_payment_id,
            });

            alert("🎉 Booking Successful!");
          } catch (err) {
            console.log("VERIFY ERROR:", err);
            alert("Payment verification failed ❌");
          }
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Refresh page.");
        return;
      }

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("PAYMENT FAILED:", response);
        alert("Payment failed ❌");
      });

      rzp.open();
    } catch (err) {
      console.log("ORDER ERROR:", err);
      alert("Payment failed");
    }
  }

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Hero */}
        <div className="pt-16 flex justify-center relative">
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 opacity-20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2"></div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-6 w-[90%] max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Discover & Book Amazing Events 🎉
              </span>
            </h1>

            <p className="text-center text-gray-600">
              Find the best events happening around you
            </p>
          </div>
        </div>

        <br />

        {/* Divider */}
        <div className="h-[1px] w-[80%] mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent mt-12"></div>

        {/* Events Section */}
        <div className="p-8 mt-10 bg-white/5 backdrop-blur-md rounded-2xl mx-4 md:mx-10 border border-white/10">

          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            🚀 Explore Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-green-400/30 hover:scale-[1.03] transition-all duration-300"
              >

                {/* ✅ EVENT IMAGE */}
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-xl mb-3 hover:scale-105 transition"
                  />
                )}

                <h2 className="text-xl font-bold text-green-400 mb-2">
                  {event.title}
                </h2>

                <p className="text-gray-200 text-sm mb-4">
                  {event.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-yellow-400">
                    ₹{event.price}
                  </p>

                  <button
                    onClick={() => handlePayment(event)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}

          </div>

          {events.length === 0 && (
            <p className="text-center text-gray-300 mt-10">
              No events available 😔
            </p>
          )}
        </div>
      </div>

      {/* Extra Component */}
      <HandpickedCollections />

    </div>
  );
};

export default Home;