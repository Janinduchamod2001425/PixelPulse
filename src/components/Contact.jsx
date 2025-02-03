import React from "react";
import AnimatedTitle from "./AnimatedTitle.jsx";
import Button from "./Button.jsx";

const ImageClipBox = ({ src, clipClass, alt }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="img/contact-1.jpg"
            clipClass="contact-clip-path-1"
            alt="Contact-img"
          />
          <ImageClipBox
            src="img/contact-2.jpg"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            alt="Contact-img"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-100"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Cherish Every Moment
          </p>

          <AnimatedTitle
            title="Let&#39;s c<b>e</b>lebrate the <br /> be<b>a</b>uty of <br /> s<b>i</b>mple m<b>o</b>ments."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="Share the Love"
            containerClass="mt-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default Contact;
