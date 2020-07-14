import { Router } from "express";
import cors from "cors";

// Init router and path
const router = Router();

// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: true,
};
router.use(cors(options));

router.options("*", cors(options));
export default router;
