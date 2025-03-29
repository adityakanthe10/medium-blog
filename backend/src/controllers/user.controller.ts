import { Hono } from "hono";
import { Context } from "hono";
import { sign, verify } from "hono/jwt";
// import { signupInput } from "../../../common/src/index";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  signupInput,
  signinInput,
} from "@adityakanthe2024/complete-medium-commmon";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

enum StatusCode {
  SUCCESS = 200,
  BADREQ = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  SERVERERROR = 500,
}

export const signup = async (c: Context) => {
  console.log("Signup function called");
  console.log("DATABASE_URL:", c.env.DATABASE_URL);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: { email: string; password: string; name?: string } =
      await c.req.json();
    console.log("Request Body:", body);

    const { success } = signupInput.safeParse(body);
    console.log("Validation result:", success);
    if (!success) {
      return c.json(
        {
          message: "Inputs are not correct",
        },
        StatusCode.BADREQ
      );
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log("User Exist Check:", isUserExist);

    if (isUserExist) {
      console.log("Email already exists");
      return c.json({ message: "Email already exists" }, StatusCode.BADREQ);
    }

    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name || "Anonymous",
      },
    });
    console.log("User Created:", response);

    const res_id = response.id;

    const jwtToken = await sign({ id: res_id }, c.env.JWT_SECRET);
    console.log("Generated JWT Token:", jwtToken);

    return c.json(
      {
        msg: "User created Successfully",
        jwt: jwtToken,
        user: {
          userId: response.id,
          username: response.name,
          email: response.email,
        },
      },
      StatusCode.SUCCESS
    );
  } catch (error) {
    console.error("Error in signup:", error);
    return c.json(
      { msg: "Internal Server Error", error },
      StatusCode.SERVERERROR
    );
  }
};

export const signin = async (c: Context) => {
  console.log("Signin function called");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const body = await c.req.json();
    console.log("Signin Request Body:", body);

    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.json(
        {
          message: "Inputs are not correct",
        },
        StatusCode.BADREQ
      );
    }

    const response = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    console.log("User Found:", response);

    if (!response) {
      console.log("User does not exist");
      return c.json({ msg: "User does not exist" }, StatusCode.NOTFOUND);
    }

    const userId = response.id;
    const token = await sign({ id: userId }, c.env.JWT_SECRET);
    console.log("Generated JWT Token:", token);

    return c.json(
      {
        message: "User Logged In Successfully",
        token: token,
        user: {
          jwt: token,
          userId: response.id,
          username: response.id,
          email: response.email,
        },
      },
      StatusCode.SUCCESS
    );
  } catch (error) {
    console.error("Error in signin:", error);
    return c.json(
      { message: "Internal Server Error", error },
      StatusCode.SERVERERROR
    );
  }
};
