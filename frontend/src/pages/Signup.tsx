// import { Auth } from "../components/auth/Auth";
import { Quote } from "../components/Quote";
import { Signupcomponent } from "../components/auth/signupcomponent";

export const Signup = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Signupcomponent />
          {/* <Auth type="signin" /> */}
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
// export { Signup };
