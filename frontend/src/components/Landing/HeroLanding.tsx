import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-black text-white flex-grow flex flex-col justify-center items-center text-center px-6 md:px-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Your Blog
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover insightful articles, tips, and stories from experts in
          various fields. Join our community and start your blogging journey
          today.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup">
            <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-6 border-t border-gray-700">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Your Easy. Created with ❤️
      </p>
    </footer>
  );
};

const HeroLanding = () => {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
};

export default HeroLanding;
