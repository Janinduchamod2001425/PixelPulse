import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Puuung", "Posts", "Videos", "About", "Contact"];

const Navbar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // State to manage audio pop up box
  const [showAudioPopup, setShowAudioPopup] = useState(false);

  // Refs for audio and navigation container
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  // Refs for audio pop up box
  const popupRef = useRef(null);

  // check if the user has already seen the audio pop up
  useEffect(() => {
    if (!localStorage.getItem("audioPopupSeen")) {
      setShowAudioPopup(true);
    }
  }, []);

  // Get current scroll position and manage navigation bar visibility
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
    setShowAudioPopup(false);
    localStorage.setItem("audioPopupSeen", "true");
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Manage navigation bar visibility
  useEffect(() => {
    // Top most position : Show navbar without floating-navbar
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down : hide navbar and apply floating-navbar
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up : show navbar with floating-navbar
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Add GSAP to navigation bar
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Add GSAP to audio pop up box
  useEffect(() => {
    if (showAudioPopup) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [showAudioPopup]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        {/*Navbar*/}
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            {/*Logo*/}
            <img src="/img/logo.png" alt="Logo" className="w-10 rounded" />

            {/*Products Button*/}
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow className="animate-pulse" />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/*Nav Links*/}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  className="nav-hover-btn"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/*Music Play Button*/}
            <div className="relative">
              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  src="/audio/puuung.mp3"
                  className="hidden"
                  loop
                />

                {/*Audio Indicators*/}
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>

              {/*Instruction Box*/}
              {showAudioPopup && (
                <div
                  ref={popupRef}
                  className="absolute sm:right-0 sm:left-2 -left-5 sm:top-3 top-10 sm:mt-2 w-40 -translate-x-1/2 rounded-lg bg-gray-900 p-3 text-xs text-white shadow-md animate-fadeIn"
                >
                  🎵 Click here to enable background music!
                  <button
                    onClick={() => {
                      setShowAudioPopup(false);
                      localStorage.setItem("audioPopupSeen", "true");
                    }}
                    className="mt-2 w-full rounded-lg bg-violet-300 px-2 py-1 text-xs text-white animate-bounce font-medium"
                  >
                    Got it!
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
