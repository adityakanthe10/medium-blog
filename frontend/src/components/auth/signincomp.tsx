import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../../store/reduxhooks";
import { Toast } from "primereact/toast";
import { signinUser } from "../../features/login";

// Schema Validation
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
});

export const Signincomp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toastRef = useRef<Toast>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await dispatch(signinUser(values)).unwrap();
        console.log(response.jwt, "response ");
        localStorage.setItem("token", response.jwt);
        toastRef.current?.show({
          severity: "success",
          summary: "Login Successful",
          detail: "Welcome back!",
          life: 3000,
        });
        setTimeout(() => navigate("/blogs"), 1000);
      } catch (error: unknown) {
        console.log(error);
        toastRef.current?.show({
          severity: "error",
          summary: "Login Failed",
          detail: "Invalid Email or Password",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-screen flex justify-center flex-col"
    >
      <Toast ref={toastRef} />
      <div className="flex justify-center">
        <div>
          <div className="px-10 ">
            <div className="text-3xl font-bold ">Welcome to Easy</div>
            <div className="text-slate-500 font-medium text-center text-sm">
              Don't have an account?
              <Link className="pl-1 text-blue-800 font-medium" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
          <div className="pt-10">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-black ">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-bold"
                placeholder="Username"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
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
        </div>
      </div>
    </form>
  );
};
