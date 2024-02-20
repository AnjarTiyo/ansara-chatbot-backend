import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import Health from "./src/routes/health.route";
import { errorHandle, notFoundHandle } from "./src/middlewares";

const app = new Hono().basePath("/api/v1")

// Initialize middleware
app.use("*", logger(), prettyJSON());

// Cors
app.use("8", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Routes
// Health route
app.route("/health", Health)

// Error Handle
app.onError((err,c)=> {
    const error = errorHandle(c);
    return error;
})

// Not Found Handle
app.notFound((c) => {
    const notFound =notFoundHandle(c);
    return notFound;
})

export default app;