import express, { Request, Response } from 'express'
import { testFunction } from '../controllers/user/testController';

const router = express.Router();

router.get('/',(req: Request, res: Response) => {
    res.send('Hello, this is user');
})

router.get("/test", testFunction);

export default router;