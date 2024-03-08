import search from "@/utils/search";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
	let { searchTerm, lastMessage } = req.body;

	try {
		const searchResults = await search(searchTerm as string, lastMessage);
		return res.status(200).json({ searchResults });
	} catch (error) {
		return res
			.status(500)
			.json({ searchResults: "", error: "Error searching for results" });
	}
}
