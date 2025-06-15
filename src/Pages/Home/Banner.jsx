import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Slides Data
const slides = [
  {
    id: 1,
    title: "Be a Good Neighbor, Make a Difference",
    description:
      "Join our volunteer network and support your local community with heart and action.",
    btn1: "Become a Volunteer",
    btn2: "Learn More",
    bg: "https://i.postimg.cc/Xv9n37g7/volunteer-1.jpg",
  },
  {
    id: 2,
    title: "Together, We Build Stronger Communities",
    description:
      "Contribute your time, skills, and care to uplift the lives of people around you.",
    btn1: "Start Helping",
    btn2: "Get Involved",
    bg: "https://i.postimg.cc/5NKF2p6D/volunteer-2.jpg",
  },
  {
    id: 3,
    title: "Kindness Starts with Action",
    description:
      "Support local causes, lead change, and bring hope to those in need.",
    btn1: "Volunteer Now",
    btn2: "Explore Projects",
    bg: "https://i.postimg.cc/3JNp6sTg/volunteer-3.jpg",
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for arrows
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="h-[80vh] md:h-[92vh] w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
        }}
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
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center filter grayscale-50"
              style={{ backgroundImage: `url(${slide?.bg})` }}
            >
              <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center px-6">
                <div className="text-center text-white max-w-3xl relative">
                  <motion.h1
                    key={slide.id + "-title"}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : -30,
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    key={slide.id + "-desc"}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 30,
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl mb-8"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    key={slide.id + "-buttons"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      scale: activeIndex === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <button className="bg-primary text-white px-6 py-3 rounded text-lg hover:bg-white hover:text-primary transition">
                      {slide.btn1}
                    </button>
                    <button className="bg-white text-primary px-6 py-3 rounded text-lg hover:bg-primary hover:text-white transition">
                      {slide.btn2}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Custom Arrows */}
      <div className="absolute top-1/2 w-full flex justify-between px-6 z-50 transform -translate-y-1/2">
        <button
          ref={prevRef}
          className="text-white bg-primary hover:bg-secondary p-3 rounded-full shadow-md"
        >
          ❮
        </button>
        <button
          ref={nextRef}
          className="text-white bg-primary hover:bg-secondary p-3 rounded-full shadow-md"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Banner;
