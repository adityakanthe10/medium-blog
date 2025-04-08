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
import { verifyIdToken } from "../lib/firebase.utils";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// enum status code
enum StatusCode {
  SUCCESS = 200,
  BADREQ = 400,
  NOTFOUND = 404,
  FORBIDDEN = 403,
  SERVERERROR = 500,
}

// hashing password

async function hashpassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
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

    // input validations
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
    //  check user exists
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
    

    // hash the password
    const hashPassword = await hashpassword(body.password);
    console.log("hashpassword", hashpassword);

    // create a new user
    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: hashPassword,
        name: body.name || "Anonymous",
      },
    });
    console.log("User Created:", response);

    const res_id = response.id;

    //  create jwt token
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

// verify password
async function verifyPassword(
  inputPassword: string,
  storedHash: string
): Promise<boolean> {
  const hashedInput = await hashpassword(inputPassword);
  return hashedInput === storedHash;
}

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

    // input validation
    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.json(
        {
          message: "Inputs are not correct",
        },
        StatusCode.BADREQ
      );
    }
    // find user by email
    const response = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    console.log("User Found:", response);

    if (!response) {
      console.log("User does not exist");
      return c.json({ msg: "User does not exist" }, StatusCode.NOTFOUND);
    }

    if (response.isGoogleAuth && !response.password) {
      return c.json({
        msg: "You signed up using Google. Please use Google login or set a password in your settings.",
      }, StatusCode.FORBIDDEN);
    }
    
    // verify password
    const isValidPassword = await verifyPassword(
      body.password,
      response.password as string
    );

    if (!isValidPassword) {
      return c.json({ msg: "Invalid Credentials" }, StatusCode.BADREQ);
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

export const firebase = async (c: Context) => {
  console.log("Firebase function called");
  console.log(c.env.JWT_SECRET,"jwt secret", )
console.log("DATABASE_URL",c.env.DATABASE_URL)
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
  
    // console.log("Database connected successfully");
    const authHeader = c.req.header("Authorization");
    const idToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;


    // const { idToken } = await c.req.json()
    if (!idToken) {
      return c.json({ message: 'Unauthorized Firebase Login: Missing Token' }, 401);
    }
    const firebaseUser = await verifyIdToken(idToken);
    console.log("Decoded Firebase User:", firebaseUser)

    let user = await prisma.user.findUnique({
      where: { email: firebaseUser.email as string }
    })

    if (user && !user.firebaseUid) {
      user = await prisma.user.update({
        where: { email: firebaseUser.email as string },
        data: {
          firebaseUid: firebaseUser.user_id as string,
          name: firebaseUser.name as string,
          photoUrl: firebaseUser.picture as string | null | undefined,
          provider: (firebaseUser.firebase as { sign_in_provider?: string | null | undefined })?.sign_in_provider,
          isGoogleAuth:true
        }
      })
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: firebaseUser.user_id as string | null | undefined,
          email: (firebaseUser.email as string) ?? "default@example.com",
          name: firebaseUser.name as string | null | undefined,
          photoUrl: firebaseUser.picture as string | null | undefined,
          provider: (firebaseUser.firebase as { sign_in_provider?: string | null | undefined })?.sign_in_provider,
          isGoogleAuth:true
        }
      })
    }
    const userId = user.id

    const token = await sign({ id: userId },c.env.JWT_SECRET)
    // const token = await sign({ id: userId }, c.env.JWT_SECRET);
    console.log("Generated JWT Token:", token);
    return c.json({
      message: 'Firebase login successful',
      token,
      user,
    })

  } catch (error) {
    console.error("Firebase login error", error)
    return c.json({ message: 'Unauthorized Firebase Login' }, 401)
  }
}

export const setpassword = async (c: Context) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const authHeader = c.req.header("Authorization");

  const token = authHeader?.split(" ")[1];
  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const decoded = await verify(token, c.env.JWT_SECRET);
  if (!decoded?.id) {
    return c.json({ message: "Invalid Token" }, 401);
  }

  const hashPwd = await hashpassword(body.password);

  const updatedUser = await prisma.user.update({
    where: { id: decoded.id as number },
    data: {
      password: hashPwd,
      isGoogleAuth: false, // Optional: disable this if they now have a password
    },
  });

  return c.json({ message: "Password updated successfully", user: updatedUser });
}
