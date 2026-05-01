import { useEffect, useState } from "react";
import API from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    API.get("/bookings/my")
      .then((res) => {
        console.log("BOOKINGS:", res.data); // ✅ DEBUG
        setBookings(res.data);
      })
      .catch((err) => {
        console.log("BOOKING ERROR:", err.response?.data || err); // ✅ DEBUG
        alert("Failed to load bookings ❌");
      });
  }, []);

  return (
    <div className="p-6">
      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found 😔</p>
      )}

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-3">
          {/* ✅ Safe access */}
          <h3>{b.event?.title || "Event not found"}</h3>

          {/* ✅ QR check */}
          {b.qrCode ? (
            <img src={b.qrCode} alt="QR" className="w-32 mt-2" />
          ) : (
            <p className="text-red-500">QR not available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;