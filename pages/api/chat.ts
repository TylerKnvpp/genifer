import { OpenAIStream, StreamingTextResponse } from "ai";
import generateSearchTerm from "@/utils/generateSearchTerm";
import openai from "@/services/openai";

export const runtime = "edge";

export default async function POST(req: any) {
	let { messages } = await req.json();
	const lastMessage = messages[messages.length - 1]?.content;
	console.log(lastMessage);
	// 1. analyze the request and generate search term
	console.log("Generating search term...");
	const searchTerm = await generateSearchTerm(lastMessage);
	console.log(searchTerm);
	// 2. use search engine to find the most relevant context
	const response = await fetch("http://localhost:3000/api/search", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ searchTerm, lastMessage }),
	});

	if (!response.ok) {
		console.error(`Error: ${response.status}`);
		return;
	}

	const data = await response.json();
	// const searchResults = await search(searchTerm as string, lastMessage);
	console.log(data);
	if (!data) {
		throw new Error("No search results found");
	}
	// 3. generate a UI to render
	const ui = await openai.chat.completions.create({
		model: "gpt-4-turbo-preview",
		stream: true,
		max_tokens: 4000,
		messages: [
			{
				role: "system",
				content:
					"You are a UI expert that specializes in html and inline css. You will be given a piece of content and be expected to create a modern looking component to render the content. Use color schemes that inspire you from the given content. Use proper spacing and header styles. Do not respond with anything other than HTML and incline styles. Use iframes for video urls. Make sure links open in new tabs.",
			},
			{
				role: "user",
				content: data.searchResults,
			},
		],
	});
	const stream = OpenAIStream(ui);
	return new StreamingTextResponse(stream);
}
