import express from 'express';
import adminRoute from "./adminRoute";
import userRoute from "./userRoute";

const router = express.Router();

router.use('/user', userRoute);
router.use('/admin', adminRoute);

export default router;

