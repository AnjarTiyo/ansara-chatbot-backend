import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { errorHandle, notFoundHandle } from "./middlewares";

// Initiate Hono
const app = new Hono().basePath("/api/v1");

// TODO config DB

// Initialize Middleware
app.use("*", logger(), prettyJSON(), compress());

// Cors
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Home Route
app.get("/", (c) => {
  c.text("Hellow Murz!");
});

// TODO User Route
// TODO Repository Route
// TODO Chat Route

// Error Handle
app.onError((err, c) => {
  const error = errorHandle(c);
  return error;
});

// Not Found Handle
app.notFound((c) => {
  const error = notFoundHandle(c);
  return error;
});

const port = Bun.env.PORT || 6000;

export default {
  port,
  fetch: app.fetch,
};
