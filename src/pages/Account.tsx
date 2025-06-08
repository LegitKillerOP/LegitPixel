import { useAuth } from '../context/AuthContext';
import { Link,NavLink } from 'react-router-dom';

const Account = () => {
  const { userData, logout } = useAuth();

  const username = userData?.username || 'User';
  const email = userData?.email || 'example@email.com';

  return (
    <div style={{ fontFamily: 'Neuton, serif' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
        </ul>
        <div className="py-5 flex justify-between text-white">
          <h1 className="text-2xl">Account details</h1>
        </div>
      </div>

      {/* Top Decoration */}
      <div
        className="h-12 bg-no-repeat bg-top"
        style={{ backgroundImage: 'url(/assets/content-top-bg.png)' }}
      ></div>

      {/* Main Content */}
      <div
        className="bg-repeat-y bg-top"
        style={{ backgroundImage: 'url(/assets/content-middle-bg.png)' }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row px-16 gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-[250px] flex flex-col gap-4">
            <div className="bg-white border border-gray-300">
              <h2 className="text-gray-700 bg-gray-200 text-lg py-2 px-2">Your account</h2>
              <div className="flex flex-col py-2">
                <NavLink to="/account/profile" className="w-full px-2 text-[#343637]">Your Profile</NavLink>
                <NavLink to="/account/alerts" className="w-full p-2 text-[#343637]">Alerts</NavLink>
                <NavLink to="/account/reactions-given" className="w-full p-2 text-[#343637]">Reaction given</NavLink>
                <NavLink to="/account/reactions-received" className="w-full p-2 text-[#343637]">Reaction received</NavLink>
                <NavLink to="/account/bookmarks" className="w-full p-2 text-[#343637] border-b border-gray-300">Bookmarks</NavLink>

                <h2 className="text-yellow-400 p-2">Settings</h2>
                <NavLink to="/account" className="w-full bg-gray-300 p-2 font-semibold text-[#343637]">Account details</NavLink>
                <NavLink to="/account/password" className="w-full p-2 text-[#343637]">Password and security</NavLink>
                <NavLink to="/account/privacy" className="w-full p-2 text-[#343637]">Privacy</NavLink>
                <NavLink to="/account/preferences" className="w-full p-2 text-[#343637]">Preferences</NavLink>
                <NavLink to="/account/minecraft" className="w-full p-2 text-[#343637]">Minecraft account</NavLink>
                <NavLink to="/account/following" className="w-full p-2 text-[#343637]">Following</NavLink>
                <NavLink to="/account/ignoring" className="w-full p-2 text-[#343637]">Ignoring</NavLink>
              </div>
            </div>
            <div className="border border-gray-300 flex flex-col py-2 gap-2">
              <Link to="/login" onClick={logout} className="w-full p-2 text-[#343637]">LogOut</Link>
            </div>
          </aside>

          {/* Right Side Content */}
          <section className="w-full max-w-[600px] bg-white border border-gray-300 rounded-lg p-8 text-[#343637] shadow-md">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-400 pb-2">Username</h2>
              <p className="text-2xl font-bold mb-1">{username}</p>
              <p className="text-sm text-gray-500">
                You may next change your username on or after{' '}
                <span className="font-semibold text-yellow-500">
                  {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}
                </span>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-400 pb-2">Email</h2>
              <p className="text-lg font-semibold mb-3">{email}</p>
              <a
                href="#"
                className="text-yellow-500 hover:text-yellow-600 font-medium underline focus:outline-none transition-colors"
              >
                Change
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div
        className="h-12 mb-10 bg-no-repeat bg-top"
        style={{ backgroundImage: 'url(/assets/content-bottom-bg.png)' }}
      ></div>
    </div>
  );
};

export default Account;
