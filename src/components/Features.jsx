import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

// BentoTilt Component: Adds a tilt effect to child elements
const BentoTilt = ({ children, className = "" }) => {
  // State to store the transform style for tilt effect
  const [transformStyle, setTransformStyle] = useState("");

  // Reference to the component to calculate mouse position relative to it
  const itemRef = useRef();

  // Handles mouse movement to create the tilt effect
  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  // Resets the tilt effect when the mouse leaves
  const handleMouseLeave = () => {
    setTransformStyle(""); // Reset the transform style to the default
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description, isComingSoon }) => {
  return (
    // Card Template
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          {/*Features Title*/}
          <p className="font-circular-web text-lg text-blue-50">
            💖 Love in Every Little Moment
          </p>

          {/*Description*/}
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Discover the warmth of everyday love through heartfelt illustrations
            that capture the beauty of small, meaningful moments in life.
          </p>
        </div>

        {/*Bento Cards*/}

        {/*Feature card 1*/}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Love in the <b>Li</b>ttle Things
              </>
            }
            description="Celebrate the beauty of everyday moments with illustrations that bring warmth, love, and nostalgia to life."
            isComingSoon
          />
        </BentoTilt>

        {/*Feature card grid*/}
        <div className="grid h-[135vh] sm:grid-cols-4 grid-cols-2 grid-rows-3 gap-7">
          {/*Love Card*/}
          <BentoTilt className="bento-tilt_1 row-span-4 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  Lo<b>v</b>e
                </>
              }
              description="Cherishing love in the simplest moments."
              isComingSoon
            />
          </BentoTilt>

          {/*Bond Card*/}
          <BentoTilt className="bento-tilt_1 row-span-4 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-7.mp4"
              title={
                <>
                  B<b>o</b>nd
                </>
              }
              description="A simple embrace, a world of love."
              isComingSoon
            />
          </BentoTilt>

          {/*Warm Card*/}
          <BentoTilt className="bento-tilt_1 row-span-4 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  War<b>m</b>th
                </>
              }
              description="Finding comfort in everyday love."
              isComingSoon
            />
          </BentoTilt>

          {/*Together Card*/}
          <BentoTilt className="bento-tilt_1 row-span-4 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-6.mp4"
              title={
                <>
                  To<b>g</b>ether
                </>
              }
              description="Love is beautiful when shared."
              isComingSoon
            />
          </BentoTilt>

          {/*Heart Card*/}
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-5.mp4"
              title={
                <>
                  He<b>a</b>rt
                </>
              }
              description="A space where love connects hearts across time and place."
              isComingSoon
            />
          </BentoTilt>

          {/*Hug Card*/}
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  H<b>u</b>g
                </>
              }
              description="Strengthening bonds through shared moments and gentle connection."
              isComingSoon
            />
          </BentoTilt>

          {/* Coming soon Card*/}
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-orange-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h1>

              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          {/*Small Video Card*/}
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-8.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};
export default Features;
