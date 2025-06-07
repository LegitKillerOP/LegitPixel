import React, { useContext } from 'react';
import logo from '/assets/logo.png';
import { AuthContext } from '../context/AuthContext';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { user } = useContext(AuthContext);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('mc.legitpixel.fun');
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1500);
  };

  // Get display name fallback to email or "User"
  const username = user?.displayName || user?.email || 'User';

  return (
    <header className="relative text-white">
      {/* Guest Bar */}
      <div className="text-[13px] text-[#ffd87d] bg-[rgba(16,14,9,0.6)] border-b border-l border-r border-[#4e422f] fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1200px] mx-auto px-[10px] h-[42px] overflow-y-hidden relative">
          <div className="whitespace-nowrap overflow-x-scroll pb-[30px] -mb-[30px]">
            {!user && (
              <div className="float-right bg-[rgba(11,10,7,0.15)] rounded-t-md">
                <a
                  href="/login"
                  className="inline-block align-top text-inherit py-3 px-[14px] border-l border-[#4e422f] first:rounded-tl-md first:border-l-0"
                >
                  Log in
                </a>
                <a
                  href="/register"
                  className="inline-block align-top text-inherit py-3 px-[14px] border-l border-[#4e422f]"
                >
                  Register
                </a>
              </div>
            )}
            {user && (
              <div className="float-right bg-[rgba(11,10,7,0.15)] rounded-t-md">
                <a href='/account' className="inline-block align-top text-inherit py-3 px-[14px] border-l border-[#4e422f] first:rounded-tl-md first:border-l-0">
                  {username}
                </a>
                <a href="/direct-messages" className="inline-block align-top text-inherit py-3 px-[14px] border-l border-[#4e422f] first:rounded-tl-md first:border-l-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a href="/account/alerts" className="inline-block align-top text-inherit py-3 px-[14px] border-l border-[#4e422f] first:rounded-tl-md first:border-l-0" title="Notifications">
                  <FontAwesomeIcon icon={faBell} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`h-[42px]`} />

      {/* Main Header */}
      <div
        className="bg-[url('/styles/hypixel-v2/images/header-bg.png')] bg-no-repeat bg-top bg-cover"
        style={{ minHeight: '150px' }}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div>
              <a href="/" className="block w-[150px]">
                <img
                  src={logo}
                  alt="LegitPixel Forums"
                  className="w-full object-contain"
                />
              </a>
            </div>

            {/* Play Now and Server IP */}
            <div className="font-serif text-center text-[#eedebd] uppercase w-full md:w-auto">
              <div className="pb-4 text-[15px] font-thin">
                Join <b className="text-white font-bold">300+</b> other online Players!
              </div>

              <a
                href="/play"
                className="inline-block w-full md:w-[256px] h-[82px] bg-[url('/assets/header-play-button.png')] bg-center bg-no-repeat rounded-md
                  text-[#302409] text-2xl uppercase leading-[77px] no-underline transition-colors duration-200 hover:bg-opacity-80"
              >
                Play Now
              </a>

              <div className="relative mt-3 text-[17px] font-normal text-[#ffd87d] uppercase text-shadow-lg">
                <span className="mr-1 text-[15px] font-thin text-white">Server IP »</span>
                <span
                  className="cursor-pointer hover:underline transition-all duration-300"
                  onClick={copyToClipboard}
                >
                  mc.LegitPixel.fun
                </span>
                {tooltipVisible && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[235px] p-1 text-xs bg-black bg-opacity-80 rounded text-center opacity-100"
                    style={{ transition: 'opacity 0.13s' }}
                  >
                    Click to Copy!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
