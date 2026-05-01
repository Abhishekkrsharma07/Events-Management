import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20">

      {/* 🔥 Top CTA Section (NEW - like screenshot) */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-center py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Start Your Event Journey Today 🚀
        </h2>

        <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition">
          Get Started Free
        </button>
      </div>

      {/* 🔥 Main Footer */}
      <div className="bg-black/60 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                🚀 EventHub
              </h2>
              <p className="text-gray-300 mt-3 text-sm">
                Discover, book, and experience the best events happening around you.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4">
                <FaFacebook className="text-gray-400 hover:text-blue-500 cursor-pointer transition text-lg" />
                <FaInstagram className="text-gray-400 hover:text-pink-500 cursor-pointer transition text-lg" />
                <FaTwitter className="text-gray-400 hover:text-sky-400 cursor-pointer transition text-lg" />
                <FaLinkedin className="text-gray-400 hover:text-blue-400 cursor-pointer transition text-lg" />
              </div>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-white font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="hover:text-green-400 cursor-pointer transition">Home</li>
                <li className="hover:text-green-400 cursor-pointer transition">Events</li>
                <li className="hover:text-green-400 cursor-pointer transition">Categories</li>
                <li className="hover:text-green-400 cursor-pointer transition">Popular</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="hover:text-green-400 cursor-pointer transition">About Us</li>
                <li className="hover:text-green-400 cursor-pointer transition">Careers</li>
                <li className="hover:text-green-400 cursor-pointer transition">Blog</li>
                <li className="hover:text-green-400 cursor-pointer transition">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-3">
                Subscribe to get latest event updates.
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-3 py-2 rounded-l-lg bg-black/40 border border-white/20 text-sm text-white focus:outline-none"
                />
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-r-lg text-sm hover:scale-105 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
            <p>© {new Date().getFullYear()} EventHub. All rights reserved.</p>

            <div className="flex gap-6">
              <span className="hover:text-green-400 cursor-pointer transition">
                Privacy Policy
              </span>
              <span className="hover:text-green-400 cursor-pointer transition">
                Terms & Conditions
              </span>
              <span className="hover:text-green-400 cursor-pointer transition">
                Support
              </span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;