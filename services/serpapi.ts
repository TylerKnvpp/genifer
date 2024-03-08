import { getJson } from "serpapi";

export const serpapi = async (q: string) => {
	try {
		const response = await getJson({
			engine: "google",
			kl: "us-en",
			api_key: process.env.SERPAPI_API_KEY,
			q,
		});
		return response;
	} catch (error) {
		console.log(error);
		throw new Error(`${error}`);
	}
};
