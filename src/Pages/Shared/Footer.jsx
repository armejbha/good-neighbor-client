import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#102116] text-white px-2 md:px-0">
      {/* Branding Section */}
      <div className="text-center border-b border-[#2c3e2e] py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-primary">Good</span>Neighbor
        </h1>
        <p className="text-white text-sm max-w-2xl mx-auto text-bold">
          Building a better community — one act of kindness at a time.
        </p>
      </div>

      {/* 4 Columns */}
      <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1 - Mission */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Our Mission
          </h2>
          <p className="text-sm text-white leading-relaxed">
            We believe in empowering individuals to uplift their neighborhoods.
            Through service, empathy, and unity, we create real impact —
            together.
          </p>
        </div>

        {/* Column 2 - Become a Volunteer */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Become a Volunteer
          </h2>
          <p className="text-sm mb-4">
            Want to make a difference? Lend your time and heart to a cause that
            matters.
          </p>
          <Link
            to="/volunteer"
            className="mt-2 inline-block bg-primary text-white px-5 py-2 rounded-full text-sm hover:bg-secondary transition"
          >
            Join the Team
          </Link>
        </div>

        {/* Column 3 - Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/allVolunteer" className="hover:underline">
                All Volunteer
              </Link>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Impact Stories
              </a>
            </li>
            <li>
              <a href="3" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact Us (Your Style) */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            Contact Us
          </h2>
          <ul className="text-sm space-y-3">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-primary mt-1" />
              <span>Khilkhet, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              +880 1878 605 156
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              support@goodneighbor.org
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#2c3e2e]"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-3 md:mb-0">
          © 2025 Good Neighbor — Serving with Heart.
        </p>
        <div className="flex gap-4 text-primary">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="hover:text-secondary transition text-lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="hover:text-secondary transition text-lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-secondary transition text-lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
