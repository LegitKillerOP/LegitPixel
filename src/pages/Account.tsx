import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { currentUser, userData } = useAuth();

  const username = userData?.username || 'User';
  const email = userData?.email || 'example@email.com';

  return (
    <div style={{ fontFamily: "Neuton, serif" }}>
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
        style={{ backgroundImage: "url(/assets/content-top-bg.png)" }}
      ></div>

      {/* Main Content */}
      <div
        className="bg-repeat-y bg-top"
        style={{ backgroundImage: "url(/assets/content-middle-bg.png)" }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row px-16 gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-[250px] flex flex-col gap-4">
            <div className="bg-white border border-gray-300">
              <h2 className="text-gray-700 bg-gray-200 text-lg py-2 px-2">Your account</h2>
              <div className="flex flex-col py-2">
                <a href="#" className="w-full px-2 text-[#343637]">Your Profile</a>
                <a href="#" className="w-full p-2 text-[#343637]">Alerts</a>
                <a href="#" className="w-full p-2 text-[#343637]">Reaction given</a>
                <a href="#" className="w-full p-2 text-[#343637]">Reaction received</a>
                <a href="#" className="w-full p-2 text-[#343637] border-b border-gray-300">Bookmarks</a>
                <h2 className="text-yellow-400 p-2">Settings</h2>
                <a href="#" className="w-full bg-gray-300 p-2 font-semibold text-[#343637]">Account details</a>
                <a href="#" className="w-full p-2 text-[#343637]">Password and security</a>
                <a href="#" className="w-full p-2 text-[#343637]">Privacy</a>
                <a href="#" className="w-full p-2 text-[#343637]">Preferences</a>
                <a href="#" className="w-full p-2 text-[#343637]">Minecraft account</a>
                <a href="#" className="w-full p-2 text-[#343637]">Following</a>
                <a href="#" className="w-full p-2 text-[#343637]">Ignoring</a>
              </div>
            </div>
            <div className="border border-gray-300 flex flex-col py-2 gap-2">
              <a href="/logout" className="w-full p-2 text-[#343637]">LogOut</a>
            </div>
          </aside>

          {/* Right side user info panel */}
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
        style={{ backgroundImage: "url(/assets/content-bottom-bg.png)" }}
      ></div>
    </div>
  );
};

export default Account;
