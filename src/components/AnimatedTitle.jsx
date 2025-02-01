import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  /*The useRef() hook is used to create a persistent
     reference to the container DOM element,
     which is necessary for integrating with
     GSAP’s animation and scroll trigger functionalities.*/
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      // Add the animation to title
      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {/*Split the title string on "<br />" to create an array of lines.*/}
      {/*Each line is rendered within its own div.*/}
      {title.split("<br />").map((line, index) => (
        <div
          key={index} // Unique key for React list rendering.
          className="flex-center max-w-full flex-wrap gap-2 md:gap-3 px-10"
        >
          {/*Split each line into individual words based on spaces.*/}
          {/*Each word is processed and rendered as a separate span.*/}
          {line.split(" ").map((word, idx) => (
            // Each word is wrapped in a span with a class for individual word animation.
            // 'dangerouslySetInnerHTML' is used to render HTML within the word string.
            <span
              key={idx} // Unique key for React list rendering.
              className="animated-word"
              // Injects the word as HTML content.
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default AnimatedTitle;
