import HeroLanding from "../components/Landing/HeroLanding";
import LandingNavbar from "../components/Landing/LandingNavbar";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingNavbar />
      <HeroLanding />
    </div>
  );
};

export default Landing;
