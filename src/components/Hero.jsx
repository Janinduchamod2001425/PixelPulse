import React, { useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const totalVideos = 3;

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

  // Add GSAP properties
  useGSAP(
    () => {
      // Add smooth transition when change the video
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

  // Function to get the source of the video
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
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
          G<b>a</b>ming
        </h1>

        {/*Top Header section*/}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/*Top Heading*/}
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            {/*Sub Title*/}
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            {/*Trailer Button*/}
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/*Bottom Heading */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};
export default Hero;
