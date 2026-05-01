import { useEffect, useState } from "react";
import API from "../../api/axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    time: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ FIXED FETCH
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/events");
      console.log("EVENTS FETCHED:", res.data); // 🔍 DEBUG
      setEvents(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🚀 CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    try {
      setLoading(true);

      if (editingId) {
        await API.patch(`/events/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Event Updated ✅");
      } else {
        await API.post("/events", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Event Created 🎉");
      }

      // ✅ RESET FORM
      setForm({
        title: "",
        description: "",
        price: "",
        date: "",
        time: "",
        location: "",
        image: null,
      });

      setEditingId(null);

      // ✅ FORCE REFRESH (IMPORTANT)
      await fetchEvents();

    } catch (err) {
      console.log("FORM ERROR:", err.response?.data || err);
      alert(err.response?.data?.msg || "Error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT
  const handleEdit = (event) => {
    setEditingId(event._id);

    setForm({
      title: event.title,
      description: event.description,
      price: event.price,
      date: event.date ? event.date.split("T")[0] : "",
      time: event.time || "",
      location: event.location || "",
      image: null,
    });
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await API.delete(`/events/${id}`);
      await fetchEvents(); // ✅ refresh after delete
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h2 className="text-3xl font-bold text-center mb-6">
        Admin Dashboard ⚡
      </h2>

      {/* 📝 FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl grid gap-4 max-w-4xl mx-auto mb-10"
      >
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
        <input name="time" placeholder="Time" value={form.time} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="p-2 bg-gray-700 rounded" />
        <input type="file" onChange={handleImageChange} className="p-2 bg-gray-700 rounded" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 bg-gray-700 rounded" />

        <button className="bg-green-500 hover:bg-green-600 p-2 rounded">
          {loading ? "Processing..." : editingId ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* 🎉 EVENTS */}
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <div key={e._id} className="bg-gray-800 p-4 rounded-xl">

              {e.image && (
                <img
                  src={e.image}
                  alt=""
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}

              <h3 className="text-green-400 font-bold">{e.title}</h3>
              <p className="text-sm">{e.description}</p>

              <div className="text-sm mt-2">
                {e.date && <p>📅 {new Date(e.date).toLocaleDateString()}</p>}
                {e.time && <p>⏰ {e.time}</p>}
                {e.location && <p>📍 {e.location}</p>}
              </div>

              <p className="text-yellow-400 mt-2">₹{e.price}</p>

              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(e)} className="bg-blue-500 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(e._id)} className="bg-red-500 px-3 py-1 rounded">Delete</button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;