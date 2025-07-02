import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { AuthContext } from "../../Context/AuthContext";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Volunteering here has changed my life. The people and the projects are truly inspiring!",
  },
  {
    id: 2,
    name: "Michael Lee",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    quote:
      "Being a part of this network feels like being part of a family dedicated to real change.",
  },
  {
    id: 3,
    name: "Emily Davis",
    photo: "https://randomuser.me/api/portraits/women/47.jpg",
    quote:
      "I love how simple it is to find projects I care about and get involved quickly.",
  },
  {
    id: 4,
    name: "James Smith",
    photo: "https://randomuser.me/api/portraits/men/35.jpg",
    quote:
      "This platform gave me the opportunity to contribute in a meaningful way.",
  },
  {
    id: 5,
    name: "Olivia Brown",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    quote:
      "The community here is so welcoming and supportive of each other's efforts.",
  },
  {
    id: 6,
    name: "Daniel Wilson",
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
    quote:
      "I’ve grown both personally and professionally since volunteering here.",
  },
  {
    id: 7,
    name: "Sophia Taylor",
    photo: "https://randomuser.me/api/portraits/women/60.jpg",
    quote: "This is where I found my passion for helping others come alive.",
  },
  {
    id: 8,
    name: "Liam Martinez",
    photo: "https://randomuser.me/api/portraits/men/23.jpg",
    quote: "Each experience here teaches something new and meaningful.",
  },
  {
    id: 9,
    name: "Isabella Garcia",
    photo: "https://randomuser.me/api/portraits/women/39.jpg",
    quote: "A wonderful platform that really cares about its volunteers.",
  },
  {
    id: 10,
    name: "Noah Anderson",
    photo: "https://randomuser.me/api/portraits/men/48.jpg",
    quote: "Highly recommend for anyone looking to give back with impact.",
  },
];

const Testimonials = () => {
  const { theme } = useContext(AuthContext);
  return (
    <section className={`py-12 ${theme === "light" && "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-2 md:px-0">
        <motion.h2
          className={`text-3xl font-extrabold ${
            theme === "dark" && "text-white"
          } text-center mb-12`}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          What Our Volunteers Say
        </motion.h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="overflow-hidden"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map(({ id, name, photo, quote }) => (
            <SwiperSlide key={id}>
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 mx-auto text-center"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src={photo}
                  alt={name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="italic text-gray-700 mb-2 text-sm">"{quote}"</p>
                <h4 className="font-semibold text-base text-primary">{name}</h4>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
