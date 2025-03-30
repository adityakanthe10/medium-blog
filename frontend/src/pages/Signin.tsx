// import { Auth } from "../components/auth/Auth";
import { Signincomp } from "../components/auth/signincomp";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          {/* <Auth type="signin" /> */}
          <Signincomp />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
