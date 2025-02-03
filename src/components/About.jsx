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
          Welc<b>o</b>me to Puuung
        </h2>

        {/*Sub Title*/}
        <AnimatedTitle
          title="C<b>a</b>pturing love in the <br /> sm<b>a</b>llest moments"
          containerClass="mt-5 !text-black text-center"
        />

        {/*About Text*/}
        <div className="about-subtext">
          <p className="mb-2">
            Love isn't grand gestures—it's the <br /> quiet moments we cherish
            every day.
          </p>

          <p className="text-gray-500">
            Puuung brings warmth to the world through art, illustrating the
            simple yet beautiful moments that make love meaningful.
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
