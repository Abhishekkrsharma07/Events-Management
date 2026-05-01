import { useRef } from "react";

const collections = [
  {
    id: 1,
    title: "Stays in & Around Delhi for a Weekend Getaway",
    tag: "TOP 8",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    title: "Stays in & Around Mumbai for a Weekend Getaway",
    tag: "TOP 8",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 3,
    title: "Stays in & Around Bangalore for a Weekend Getaway",
    tag: "TOP 9",
    image:
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
  },
  {
    id: 4,
    title: "Beach Destinations",
    tag: "TOP 11",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 5,
    title: "Weekend Getaways",
    tag: "TOP 11",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 6,
    title: "Hill Stations",
    tag: "TOP 11",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

const HandpickedCollections = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative py-10 px-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
        🚀 Explore Handpicked Experiences
      </h1>

      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Upcoming Events for You.
          </h2>

          {/* Top Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
            >
              ◀
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Floating Arrows */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full w-12 h-12 items-center justify-center hover:scale-110 transition"
        >
          ◀
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full w-12 h-12 items-center justify-center hover:scale-110 transition"
        >
          ▶
        </button>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {collections.map((item) => (
            <div
              key={item.id}
              className="min-w-[260px] h-[320px] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 bg-white/5 backdrop-blur-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-md font-semibold">
                  {item.tag}
                </span>

                <h3 className="mt-2 text-sm font-semibold leading-snug">
                  {item.title}
                </h3>

                {/* Button */}
                {/* <button className="mt-3 px-3 py-1 text-sm bg-green-500 text-black rounded-md hover:bg-green-400 transition">
                  Explore
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HandpickedCollections;