import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareRight,
  faInfoCircle,
  faShoppingCart,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faYoutube,
  faTwitter,
  faTiktok,
  faInstagram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-[#1d1913] text-gray-300 text-sm md:text-base select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <FontAwesomeIcon
                icon={faCaretSquareRight}
                className="text-[#535353] mr-2"
              />
              About Us
            </h3>
            <p className="leading-relaxed text-justify">
              Starting out as a YouTube channel making Minecraft Adventure Maps,
              LegitPixel is now one of the largest and highest quality Minecraft
              Server Networks in the world, featuring original games such as The
              Walls, Mega Walls, Blitz Survival Games, and many more!
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="mr-2 text-[#535353]"
              />
              Useful Links
            </h3>
            <ul className="space-y-2 border-l border-gray-600 pl-4">
              {[
                { href: "/", label: "Home" },
                { href: "/rules/", label: "Rules & Policies" },
                { href: "https://support.hypixel.net", label: "Support" },
                { href: "https://status.hypixel.net", label: "Status" },
                { href: "/jobs/", label: "Jobs" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map(({ href, label }) => (
                <li
                  key={label}
                  className="border-b border-gray-600 last:border-b-0 pb-2"
                >
                  <a
                    href={href}
                    className="hover:text-[#535353] transition-colors duration-300 break-words"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LegitPixel Store */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="mr-2 text-[#535353]"
              />
              LegitPixel Store
            </h3>
            <p className="leading-relaxed mb-6 text-justify">
              We work very hard to bring you unique, originally created content.
              Purchasing ranks, LegitPixel Gold, and SkyBlock Gems helps support us
              in making more, higher quality content.
            </p>
            <a
              href="https://store.hypixel.net/"
              className="inline-block bg-[#15120e] text-yellow-400 px-5 py-2 rounded-md hover:bg-[#090806] transition-colors duration-300"
            >
              Visit the store
            </a>

            <ul className="flex flex-wrap justify-start sm:justify-center mt-8 space-x-2 space-y-2 sm:space-y-0">
              {/* Social Icons */}
              {[
                {
                  href: "https://www.youtube.com/user/Hypixel",
                  icon: faYoutube,
                  bg: "bg-[#FF0000]",
                  hoverBg: "hover:bg-[#cc0000]",
                  label: "YouTube",
                },
                {
                  href: "https://twitter.com/HypixelNetwork",
                  icon: faTwitter,
                  bg: "bg-[#1DA1F2]",
                  hoverBg: "hover:bg-[#0d8ddb]",
                  label: "Twitter",
                },
                {
                  href: "https://tiktok.com/@hypixel",
                  icon: faTiktok,
                  bg: "bg-[#010101]",
                  hoverBg: "hover:bg-[#333333]",
                  label: "TikTok",
                },
                {
                  href: "https://instagram.com/hypixelofficial",
                  icon: faInstagram,
                  bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
                  hoverBg: "hover:opacity-90",
                  label: "Instagram",
                },
                {
                  href: "https://www.facebook.com/Hypixel",
                  icon: faFacebook,
                  bg: "bg-[#1877F2]",
                  hoverBg: "hover:bg-[#145dbf]",
                  label: "Facebook",
                },
                {
                  href: "https://discord.gg/Hypixel",
                  icon: faDiscord,
                  bg: "bg-[#5865F2]",
                  hoverBg: "hover:bg-[#4752c4]",
                  label: "Discord",
                },
                {
                  href: "https://support.hypixel.net/",
                  icon: faEnvelope,
                  bg: "bg-[#D44638]",
                  hoverBg: "hover:bg-[#b03a2d]",
                  label: "Contact",
                },
              ].map(({ href, icon, bg, hoverBg, label }) => (
                <li key={label} className="inline-block">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${bg} ${hoverBg} inline-flex items-center justify-center w-9 h-9 rounded-md transition-colors duration-300 text-white`}
                    aria-label={label}
                  >
                    <FontAwesomeIcon icon={icon} size="lg" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#18150E] border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#433d2e] text-xs md:text-sm select-none">
          © {new Date().getFullYear()} LegiPixel Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
