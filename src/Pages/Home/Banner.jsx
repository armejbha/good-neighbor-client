import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AuthContext } from "../../Context/AuthContext";

// Slides Data
const slides = [
  {
    id: 1,
    title: "Be a Good Neighbor, Make a Difference",
    description:
      "Join our volunteer network and support your local community with heart and action.",
    btn1: "Become a Volunteer",
    btn2: "Learn More",
    bg: "https://i.postimg.cc/ncSxdRts/pexels-ron-lach-9543745.jpg",
  },
  {
    id: 2,
    title: "Together, We Build Stronger Communities",
    description:
      "Contribute your time, skills, and care to uplift the lives of people around you.",
    btn1: "Start Helping",
    btn2: "Get Involved",
    bg: "https://i.postimg.cc/zXg7Mvsn/pexels-ifaw-5486959.jpg",
  },
  {
    id: 3,
    title: "Kindness Starts with Action",
    description:
      "Support local causes, lead change, and bring hope to those in need.",
    btn1: "Volunteer Now",
    btn2: "Explore Projects",
    bg: "https://i.postimg.cc/xT6fwjL1/pexels-rdne-6647020.jpg",
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useContext(AuthContext);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={`py-12 px-4 md:px-6 ${theme === "light" && "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center ${
                  theme === "dark"
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                <div className="md:w-1/2 h-full">
                  <img
                    src={slide.bg}
                    alt={slide.title}
                    className="w-full md:h-[650px] object-cover"
                  />
                </div>
                <div className="p-6 md:p-10 md:w-1/2 text-center md:text-left">
                  <motion.h2
                    key={slide.id + "-title"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : -20,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl md:text-4xl font-bold mb-4"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    key={slide.id + "-desc"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg mb-6"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    key={slide.id + "-buttons"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  >
                    <button className="bg-primary text-white px-5 py-2 rounded hover:bg-secondary transition">
                      {slide.btn1}
                    </button>
                    <button className="border border-primary text-primary px-5 py-2 rounded hover:bg-primary hover:text-white transition">
                      {slide.btn2}
                    </button>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-4 z-10">
          <button
            ref={prevRef}
            className="bg-primary text-white p-2 rounded-full shadow hover:bg-secondary"
          >
            ❮
          </button>
          <button
            ref={nextRef}
            className="bg-primary text-white p-2 rounded-full shadow hover:bg-secondary"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
