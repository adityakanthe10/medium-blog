// import { Auth } from "../components/auth/Auth";
import { Signincomp } from "../components/auth/signincomp";
import { SelfPromotion } from "../components/SelfPromotion";

export const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          {/* <Auth type="signin" /> */}
          <Signincomp />
        </div>
        <div className="hidden lg:block">
          <SelfPromotion />
        </div>
      </div>
    </div>
  );
};
