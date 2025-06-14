import { useState } from "react";
import { loginUser, signInWithGoogle } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/"); // Redirect to home
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Redirect to home
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-40 px-4 sm:px-6 lg:px-20 flex-col">
        <ul className="breadcrumbs py-2">
          <li className="text-yellow-400">Home</li>
        </ul>
        <div className="py-5 flex items-center text-white">
          <h1 className="text-2xl">Login</h1>
        </div>
      </div>

      <div
        className="h-12 bg-no-repeat bg-top"
        style={{ backgroundImage: "url(/assets/content-top-bg.png)" }}
      ></div>

      <div
        className="bg-repeat-y bg-top"
        style={{ backgroundImage: "url(/assets/content-middle-bg.png)" }}
      >
        <div className="max-w-[1200px] mx-auto flex justify-center px-4 sm:px-6 lg:px-16 py-4">
          <div className="flex w-full max-w-3xl overflow-hidden">
            <div className="w-1/2 flex flex-col justify-center items-center p-6">
              <img src="/assets/logo.png" alt="Icon" className="w-64 h-64" />
            </div>

            <form
              onSubmit={handleLogin}
              className="w-1/2 bg-white text-black p-8 flex flex-col gap-4"
            >
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@mail.com"
                  className="border border-gray-300 rounded p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-semibold">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="border border-gray-300 rounded p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded p-2 font-semibold"
              >
                Login with Email
              </button>

              <div className="text-center text-gray-600">or</div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded p-2 font-semibold"
              >
                <span className="text-xl">G</span>
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        className="h-12 mb-10 bg-no-repeat bg-top"
        style={{ backgroundImage: "url(/assets/content-bottom-bg.png)" }}
      ></div>
    </>
  );
}
