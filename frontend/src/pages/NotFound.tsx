import { Link } from "react-router-dom";
// import { assets } from "../assets/assets";
// import { Appbar } from "../components/Appbar";

export const NotFound = () => {
  return (
    <>
      <section className="container bg-white h-screen">
        <div className=" py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-slate-700 ">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <div className="flex items-center justify-center pt-10">
              <div className="relative group">
                <Link to="/">
                  <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                      <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1">
                          Back To Homepage
                        </span>
                        <svg
                          className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                          data-slot="icon"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            clip-rule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
