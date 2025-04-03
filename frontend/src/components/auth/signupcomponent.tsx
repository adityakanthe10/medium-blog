import * as Yup from "yup";
import { useAppDispatch } from "../../store/reduxhooks";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupUser } from "../../features/signup/index";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import { signInWithGooglePopup } from "../../firebase/firebase.utils";
import { User } from "firebase/auth";

// schema yup validation
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(15, "Too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
});

export const Signupcomponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toastRef = useRef<Toast>(null);

  // Handle redirect result to retrieve user info after login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/blogs"); // Redirect if user is already logged in
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await dispatch(signupUser(values)).unwrap();
        console.log(response.jwt, "response ");
        localStorage.setItem("token", response.jwt);
        toastRef.current?.show({
          severity: "success",
          summary: "Signup Successful",
          detail: "You're in! Let's explore some amazing stories.",
          life: 3000,
        });
        setTimeout(() => navigate("/blogs"), 2000);
      } catch (error: unknown) {
        console.log(error);

        let errorMessage = "Something went wrong";

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        } else if (typeof error === "object" && error !== null) {
          errorMessage = JSON.stringify(error); // Convert object to string safely
        }
        toastRef.current?.show({
          severity: "error",
          summary: "Signup Failed",
          detail: errorMessage,
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    const user = await signInWithGooglePopup();
    if (user) {
      setUser(user);
      toastRef.current?.show({
        severity: "success",
        summary: "Login Successful",
        detail: `Welcome ${user.displayName}`,
        life: 3000,
      });
      navigate("/blogs");
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-screen flex justify-center flex-col"
    >
      <Toast ref={toastRef} />
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-bold ">Create an account</div>
            <div className="text-slate-500 font-base text-center text-sm">
              Already have an account?
              <Link className="pl-2 text-blue-800 font-medium" to={"/login"}>
                Log in
              </Link>
            </div>
          </div>
          <div className="pt-10">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-black ">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-bold"
                placeholder="Username"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-black ">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="email"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-bold"
                placeholder="Email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-black ">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-bold"
                placeholder="Password"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center text-white rounded-full bg-black hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-7 py-3 me-2 mb-2"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-t-slate-600 border-gray-300 rounded-full animate-spin  text-center"></div>
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs mx-2 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="h-6 w-6 "
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
              <span className="px-2"> Signup with Google</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
// function signupUser(values: {
//   name: string;
//   email: string;
//   password: string;
// }): any {
//   throw new Error("Function not implemented.");
// }
