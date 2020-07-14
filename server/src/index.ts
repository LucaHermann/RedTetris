import "./LoadEnv"; // Must be the first import
import express from "express";
import { SetServer } from "@server";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

const app = new SetServer().app;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["access-control-allow-origin", "Content-Type", "Authorization"],
  }),
);
app.options("*", cors());

app.all("", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

export { app };
