import React from "react";
import {
  FaDiscord,
  FaGithub,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://twitch.com", icon: <FaTwitch /> },
  { href: "https://github.com", icon: <FaGithub /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-violet-300 py-4 text-gray-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-medium md:text-left">
          ©PixelPulse 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white animate-pulse hover:animate-bounce hover:duration-700"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};
export default Footer;
