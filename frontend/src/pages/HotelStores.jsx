import { useRef } from "react";

const hotels = [
  {
    id: 1,
    name: "Ocean Breeze Retreat",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210a0",
  },
  {
    id: 2,
    name: "Skyline Luxury Suites",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 3,
    name: "Mountain View Escape",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 4,
    name: "Urban Elite Residency",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
];

const tips = [
  {
    id: 1,
    icon: "📊",
    text: "Discover hidden travel gems and trending destinations curated for explorers.",
  },
  {
    id: 2,
    icon: "🍽️",
    text: "Find top-rated dining experiences wherever your journey takes you.",
  },
  {
    id: 3,
    icon: "✈️",
    text: "Plan smarter trips with real-time travel insights and booking tips.",
  },
];

const HotelStores = () => {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (dir === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-xl mt-10 mx-4 md:mx-10">

      {/* 🔥 Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">

        {/* Left Title */}
        <div className="max-w-sm">
          <h2 className="text-3xl font-bold text-gray-900 leading-snug">
            Premium Stay Collections
          </h2>
          <p className="text-gray-500 mt-2">
            Handpicked luxury stays for your next unforgettable experience.
          </p>
        </div>

        {/* Right Slider */}
        <div className="relative w-full lg:w-[70%]">
          
          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10"
          >
            ◀
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full w-10 h-10"
          >
            ▶
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-12"
          >
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="min-w-[250px] h-[180px] rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                  {hotel.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 Bottom Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {tips.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className="text-3xl">{item.icon}</div>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HotelStores;