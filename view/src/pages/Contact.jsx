import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">

        <Link to="/" className="text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-300 text-center max-w-xl mx-auto mb-10">
          Have questions or special requests? Reach out and our team will be happy to help you.
        </p>

        {submitted && (
          <div className="bg-green-800/20 border border-green-500 rounded-lg p-4 text-green-300 mb-8 text-center">
            Thank you for contacting us! We'll get back to you shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur p-2 text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
