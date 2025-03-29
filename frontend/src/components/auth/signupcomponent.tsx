// import { SignupInput } from "@adityakanthe2024/complete-medium-commmon";
// import { ChangeEvent, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../config";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/reduxhooks";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupUser } from "../../features/signup/index";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
// import { SignupInput } from "@adityakanthe2024/complete-medium-commmon";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toastRef = useRef<Toast>(null);

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
            <div className="text-slate-500 font-medium text-center text-base">
              Already have an account?
              <Link className="pl-2 text-blue-800 font-medium" to={"/signin"}>
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
