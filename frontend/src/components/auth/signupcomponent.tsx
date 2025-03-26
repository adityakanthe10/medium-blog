// import { SignupInput } from "@adityakanthe2024/complete-medium-commmon";
// import { ChangeEvent, useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../config";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/reduxhooks";
import {
  Link,
  // useNavigate
} from "react-router-dom";
import { useFormik } from "formik";
import { signupUser } from "../../features/signup/index";
// import { SignupInput } from "@adityakanthe2024/complete-medium-commmon";

// schema yup validation
const SignupSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
});

export const Signupcomponent = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(signupUser(values));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="h-screen flex justify-center flex-col"
    >
      <div className="flex justify-center">
        <div>
          <div className="px-10 ">
            <div className="text-3xl font-extrabold ">Create an account</div>
            <div className="text-slate-400">
              Already have an account?
              <Link className="pl-2 underline" to={"/signin"}>
                Signin
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
                placeholder="Name"
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
                Username
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
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              // disabled={isSubmitting}
            >
              Sign Up
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
