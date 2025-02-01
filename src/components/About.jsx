import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle.jsx";

// Register the scroll trigger
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Configure GSAP for the Background Image
  useGSAP(() => {
    // Clip Animation for the bg image
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    // Assign the clip animation to the bg image
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/*Welcome to Title*/}
        <h2 className="font-general text-sm uppercase md:text-[15px] font-bold">
          Welc<b>o</b>me to PixelPulse
        </h2>

        {/*Sub Title*/}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/*About Text*/}
        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>

          <p className="text-gray-500">
            PixelPulse unites every player from countless games and platforms,
            both digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      {/*About Image*/}
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default About;
