// import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen  text-white">
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background with enhanced gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
            url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div>
            {/* Main Title */}
            <h1
              className="text-xl md:text-5xl font-bold mb-12 text-white"
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              }}
            >
              About Luxury Hotel
            </h1>

            {/* Enhanced Content Box */}
            <div
              className="relative p-10 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/20 rounded-full shadow-lg" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/20 rounded-full shadow-lg" />

              <div className="space-y-6">
                <div className="w-16 h-1 bg-white/40 mx-auto rounded-full" />

                <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light">
                  Welcome to our luxury hotel! We believe that your stay should
                  be an experience of comfort, elegance, and unforgettable
                  memories. Our mission is to redefine luxury by providing
                  exceptional service and beautiful rooms designed for
                  relaxation.
                </p>

                <div className="flex items-center justify-center space-x-4 mt-8">
                  <div className="w-2 h-2 bg-white/60 rounded-full" />
                  <div className="w-3 h-3 bg-white/80 rounded-full" />
                  <div className="w-2 h-2 bg-white/60 rounded-full" />
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Exceptional Service
                </h3>
                <p className="text-gray-300 text-sm">
                  24/7 personalized concierge service
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Elegant Rooms
                </h3>
                <p className="text-gray-300 text-sm">
                  Beautifully designed luxury suites
                </p>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Prime Location
                </h3>
                <p className="text-gray-300 text-sm">
                  Heart of the city's cultural district
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">
              Our Vision
            </h3>
            <p className="text-gray-300">
              To be the most preferred luxury destination for travelers who seek
              unique experiences and warm hospitality.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">
              Our Mission
            </h3>
            <p className="text-gray-300">
              Providing world-class service with attention to detail, ensuring
              every guest feels at home and cherished.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">
              Our Values
            </h3>
            <p className="text-gray-300">
              Excellence, Integrity, Hospitality, Innovation, and Guest
              Satisfaction above all.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Founded in 1995, Luxury Hotel began as a vision to create a
                sanctuary where travelers could experience true luxury and
                personalized service. What started as a boutique property has
                grown into a renowned destination that attracts guests from
                around the world.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our commitment to excellence has earned us numerous accolades,
                including the prestigious Five-Star Diamond Award and
                recognition as one of the "World's Best Hotels" by leading
                travel publications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, we continue to innovate and evolve while maintaining the
                timeless elegance and warm hospitality that has made us a
                beloved destination for discerning travelers.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">
                Key Milestones
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    <strong>1995:</strong> Hotel establishment
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    <strong>2003:</strong> First luxury suite addition
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    <strong>2010:</strong> Spa and wellness center opening
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    <strong>2018:</strong> Five-Star Diamond Award
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>
                    <strong>2023:</strong> Sustainable luxury certification
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Amenities & Services */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Amenities & Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <h4 className="font-semibold mb-3 text-orange-400">
                Accommodation
              </h4>
              <p className="text-gray-300 text-sm">
                Luxurious rooms and suites with premium amenities and stunning
                views
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <h4 className="font-semibold mb-3 text-orange-400">Dining</h4>
              <p className="text-gray-300 text-sm">
                Fine dining restaurants, rooftop bar, and 24/7 room service
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <h4 className="font-semibold mb-3 text-orange-400">Wellness</h4>
              <p className="text-gray-300 text-sm">
                Full-service spa, fitness center, and infinity pool
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <h4 className="font-semibold mb-3 text-orange-400">Business</h4>
              <p className="text-gray-300 text-sm">
                Meeting rooms, conference facilities, and business center
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Our Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="w-24 h-24 bg-orange-500/30 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold mb-2 text-orange-400">
                Sarah Johnson
              </h4>
              <p className="text-gray-300 text-sm mb-2">General Manager</p>
              <p className="text-gray-400 text-xs">
                20+ years in luxury hospitality
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="w-24 h-24 bg-orange-500/30 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold mb-2 text-orange-400">
                Michael Chen
              </h4>
              <p className="text-gray-300 text-sm mb-2">Executive Chef</p>
              <p className="text-gray-400 text-xs">
                Michelin-starred experience
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
              <div className="w-24 h-24 bg-orange-500/30 rounded-full mx-auto mb-4"></div>
              <h4 className="font-semibold mb-2 text-orange-400">
                Emily Rodriguez
              </h4>
              <p className="text-gray-300 text-sm mb-2">
                Guest Relations Director
              </p>
              <p className="text-gray-400 text-xs">
                Hospitality excellence expert
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Sustainability Commitment
          </h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-400">
                  Environmental Responsibility
                </h3>
                <p className="text-gray-300 mb-4">
                  We are committed to reducing our environmental impact through
                  sustainable practices and eco-friendly initiatives.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>100% renewable energy usage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Zero-waste kitchen program</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Water conservation systems</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-orange-400">
                  Community Impact
                </h3>
                <p className="text-gray-300 mb-4">
                  We believe in giving back to our local community and
                  supporting cultural preservation initiatives.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Local artisan partnerships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Community education programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>Cultural heritage preservation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We invite you to discover the perfect blend of elegance, comfort,
            and exceptional service. Let us create unforgettable memories for
            your next stay.
          </p>
          <a
            href="/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
}
