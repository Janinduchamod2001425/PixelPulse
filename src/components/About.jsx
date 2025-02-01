import React from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

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
        {/*Welcome Title*/}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to PixelPulse
        </h2>

        {/*Sub Title*/}
        <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure
        </div>

        {/*About Text*/}
        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>

          <p>
            PixelPulse unites every player from countless games and platforms
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
