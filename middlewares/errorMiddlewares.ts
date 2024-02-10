import { Context } from "hono";

// Error Handler
export const errorHandle = (c: Context) => {
  console.log(c.res.status);

  return c.json({
    success: false,
    message: c.error?.message,
    stack: process.env.NODE_ENV === "production" ? null : c.error?.stack,
  });
};

// Not Found Handler
export const notFoundHandle = (c: Context) => {
    return c.json({
        success: false,
        message: `Not found - [${c.req.method}] ${c.req.url}`
    })
}