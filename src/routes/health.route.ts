import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) => c.text("Hellow Puyen!"));

export default health;