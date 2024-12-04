import express from "express";
import v1Router from "../versions/v1/routes/index";

const router = express.Router();

router.use("/v1", v1Router);


export default router;
