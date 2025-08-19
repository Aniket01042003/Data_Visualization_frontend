import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaPhone } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const steps = [
  {
    title: "Data Collection",
    description: "Users upload datasets, ensuring smooth integration for analysis and visualization.",
    icon: "M10 10l2 -2v8"
  },
  {
    title: "Processing & Storage",
    description: "The system processes, cleans, and stores data efficiently for optimized visualization.",
    icon: "M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3"
  },
  {
    title: "Interactive Visualization",
    description: "Dynamic 2D and 3D charts are generated, providing meaningful insights from data.",
    icon: "M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1"
  },
  {
    title: "Actionable Insights",
    description: "Users analyze visual reports to make data-driven decisions with confidence.",
    icon: "M10 8v3a1 1 0 0 0 1 1h3"
  }
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 relative overflow-hidde">
      {/* Process Steps Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-[#00acc1] mb-4">How We Work</h2>
          <p className="text-gray-300 text-lg">We follow a streamlined process to help you unlock value from your data.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-[#1e1e1e] rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_5px_#00acc1] transition"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00acc1] mb-6"
                height="50"
                width="50"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d={step.icon} />
              </svg>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[#00acc1]">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-10 mb-10 px-6 ">
        <div className="text-center mb-15">
          <p className="text-sm uppercase tracking-widest text-gray-400">The Team</p>
          <h3 className="text-4xl font-bold text-white">Meet the <span className="text-[#00acc1]">Developer</span></h3>
        </div>

        <div className="flex flex-col mt-20 md:flex-row items-center justify-center gap-20 max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-[0_0_30px_5px_#00acc1] ring-4 ring-[#00abc151]">
            <img
              src="/profilepic.jpg"
              alt="Aniket Kapse"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="max-w-xl text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold">Aniket Kapse</h2>
            <p className="text-[#00acc1] font-medium">Full Stack Developer</p>
            <p className="text-gray-400 text-base">
              Government College of Engineering, Amravati (2021–25)
            </p>
            <p className="text-gray-300 leading-relaxed">
              Unlock the power of data with precision. I provide clear, actionable insights to empower your decision-making.
              My vision is to turn complex analytics into elegant solutions that drive growth and clarity.
            </p>

            <div className="flex gap-4 mt-4 justify-center md:justify-start text-2xl text-gray-400">
              <a href="https://www.linkedin.com/in/aniket-kapse-6495a1236/" target="_blank" rel="noreferrer" className="hover:text-[#00acc1]">
                <FaLinkedin />
              </a>
              <a href="https://github.com/Aniket01042003/" target="_blank" rel="noreferrer" className="hover:text-[#00acc1]">
                <FaGithub />
              </a>
              <a href="https://leetcode.com/u/AniketKapse/" target="_blank" rel="noreferrer" className="hover:text-[#00acc1]">
                <SiLeetcode />
              </a>
              <a href="mailto:aniketkapse100@gmail.com" className="hover:text-[#00acc1]">
                <FaEnvelope />
              </a>
              <a href="https://www.instagram.com/aniket.kapse01/" target="_blank" rel="noreferrer" className="hover:text-[#00acc1]">
                <FaInstagram />
              </a>
              <a href="tel:+918080663833" className="hover:text-[#00acc1]">
                <FaPhone />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
