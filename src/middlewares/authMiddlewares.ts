import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";
import { User } from "../models";

// TODO Protect route for master admin
export const isMaster = async (c: Context, next: Next) => {};

// TODO Protect route for client admin
export const protect = async (c: Context, next: Next) => {
  let token;

  if (
    c.req.header("Authorization") &&
    c.req.header("Authorization")?.startsWith("Bearer")
  ) {
    try {
      token = c.req.header("Authorization")?.replace(/Bearer\s+/i, "");
      if (!token) {
        return c.json({ message: "Not authorized to access this route!" });
      }

      const { id } = await Jwt.verify(token, Bun.env.JWT_SECRET || "");
      const user = await User.findById(id).select("-password");

      await next();
    } catch (error) {
      throw new Error("Invalid token! You are not");
    }
  }

  if (!token) {
    throw new Error("Not authorized! No token found!");
  }
};

// TODO Protect route for whitelisted origin
export const checkOrigin = async (c: Context, next: Next) => {
  const allowedOrigin = ["https://jdih.slemankab.go.id/", "http://localhost"];

  const reqOrigin = c.req.header("origin") as string;

  if (allowedOrigin.includes(reqOrigin)) {
    next();
  } else {
    c.json(
      {
        status: false,
        message: "Unauthorized! Unknown Access origin!",
      },
      403
    );
  }
};
