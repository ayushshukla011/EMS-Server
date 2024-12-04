import cors from "cors";

const whitelist = process.env.CORS_ORIGIN?.split(",") || [];

const corsOptions = {
	origin: [
		"http://localhost:3000",
		"http://localhost:8000",
		"http://3.6.176.116",
		"https://3.6.176.116",
	],
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};


const Cors = cors(corsOptions);

export default Cors;
