import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <Link to="/" className="text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-6 text-center">About Us</h1>

        <p className="text-lg text-gray-300 mb-6 text-center max-w-2xl mx-auto">
          Welcome to our luxury hotel! We believe that your stay should be an experience
          of comfort, elegance, and unforgettable memories. Our mission is to redefine
          luxury by providing exceptional service and beautiful rooms designed for relaxation.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-300">
              To be the most preferred luxury destination for travelers who seek unique
              experiences and warm hospitality.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-300">
              Providing world-class service with attention to detail, ensuring every guest
              feels at home and cherished.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-300">
              Excellence, Integrity, Hospitality, Innovation, and Guest Satisfaction above all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
