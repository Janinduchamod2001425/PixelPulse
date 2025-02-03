import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";

// Import GSAP and ScrollTrigger for animations
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // define a current Index state to catch the current Video
  const [currentIndex, setCurrentIndex] = useState(1);

  // Define a state to find if video was clicked or not
  const [hasClicked, setHasClicked] = useState(false);

  // Define loading state to display a loader
  const [isLoading, setIsLoading] = useState(true);

  // Define a state to count already loaded videos
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Total number of videos
  const totalVideos = 5;

  // Stores a reference to the previously played video.
  // Helps track the last played video without triggering a re-render.
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // 0 % 4 = 0 + 1 => 1
  // 1 % 4 = 1 + 1 => 2
  // 2 % 4 = 2 + 1 => 3
  // 3 % 4 = 3 + 1 => 4
  // 4 % 4 = 0 + 1 => 1
  // This will execute the number of videos times
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Function to handle the hidden mini video sections while hovering
  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // If any video is take time to play show the loading indicator
  useEffect(() => {
    if (loadedVideos === totalVideos - 3) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Add GSAP properties
  // 1. Add smooth transition when change the video
  useGSAP(
    () => {
      gsap.set("#next-video", { visibility: "visible" });

      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current.play(),
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  // 2. Add smooth scrolling effect to video frame
  useGSAP(() => {
    // Add polygon effect to video frame
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    // Set the polygon as Rectangle in initial state
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // Function to get the source of the video
  const getVideoSrc = (index) => `videos/puuung/puuung-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 cursor-pointer overflow-hidden rounded-lg">
            {/*This div is like a clickable button with video*/}
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-150 hover:opacity-100"
            >
              {/*This section set the videos into the clickable div*/}
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/*Displays the currently selected video*/}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex,
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/*Bottom Heading */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          Ani<b>m</b>e
        </h1>

        {/*Top Header section*/}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/*Top Heading*/}
            <h1 className="special-font hero-heading text-blue-100">
              Pu<b>uu</b>ng
            </h1>

            {/*Sub Title*/}
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Puuung world <br /> Experience the Beauty of Lovable
              Moments
            </p>

            {/*Trailer Button*/}
            <Button
              id="watch-trailer"
              title="Watch Videos"
              leftIcon={<TiLocationArrow className="animate-bounce" />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/*Bottom Heading */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        Ani<b>m</b>e
      </h1>
    </div>
  );
};
export default Hero;
