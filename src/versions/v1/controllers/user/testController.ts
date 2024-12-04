import { Request, Response} from "express";
import prisma from "../../../../database/index";


export const testFunction = async (req: Request, res: Response)=> {
    let a= "just to check controller";
    const halls = await prisma.hall.findMany();
    try {
         res.status(200).json({
            errors: [],
            data: {
                user: "this is a test API to demonstrate how to write API",
                testresult: "Me Ayush hii",
                halls: halls
            },
        });
    } catch (error) {
         res.status(500).json({
			errors: ["Internal server error"],
			data: {},
		});
    }

    
};