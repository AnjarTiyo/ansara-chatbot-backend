import { Context, Next } from "hono";

// TODO Protect route for master admin

// TODO Protect route for client admin

// TODO Protect route for whitelisted origin
export const checkOrigin = async (c: Context, next: Next) => {
  const allowedOrigin = ["https://jdih.slemankab.go.id/", "http://localhost"];

  const reqOrigin = c.req.header('origin') as string;

  if(allowedOrigin.includes(reqOrigin)){
    next()
  } else {
    c.json({
        status: false,
        message: "Unauthorized! Unknown Access origin!"
    }, 403)
  }
};
