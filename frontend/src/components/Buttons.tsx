import "../assets/css/marquee.css";

const MarqueeButton = () => {
  return (
    <button className="marquee-button relative overflow-hidden border-2 border-white rounded-full px-17 py-4 uppercase font-bold bg-black text-white">
      <span className="absolute inset-0 grid place-items-center transition-opacity duration-200 text">
        Get Started
      </span>
      <span
        aria-hidden="true"
        className="marquee absolute inset-0 grid place-items-center opacity-0 text-white text-base tracking-widest"
      >
        START
      </span>
    </button>
  );
};

export default MarqueeButton;
