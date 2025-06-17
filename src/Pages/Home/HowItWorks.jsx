import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Context/AuthContext";

const steps = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.84 4.578c0 4.418-3.582 8-8 8s-8-3.582-8-8a12.083 12.083 0 01.839-4.578L12 14z" />
      </svg>
    ),
    title: "Join the Network",
    description: "Sign up and become part of our caring volunteer community.",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M9 12h6M9 16h6M12 8h.01M20 12c0 4.418-3.582 8-8 8a8 8 0 110-16c4.418 0 8 3.582 8 8z" />
      </svg>
    ),
    title: "Choose a Project",
    description:
      "Browse volunteer projects and select what matters most to you.",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Make an Impact",
    description:
      "Participate, share your skills, and help your community thrive.",
  },
];

const HowItWorks = () => {
  const { theme } = useContext(AuthContext);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className={`text-3xl font-extrabold text-gray-900 mb-8 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {steps.map(({ id, icon, title, description }) => {
            return (
              <motion.div
                key={id}
                className="bg-gray-50 p-8 rounded-lg shadow-md max-w-sm mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.2 }}
              >
                <div className="flex justify-center items-center mb-4">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {title}
                </h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
