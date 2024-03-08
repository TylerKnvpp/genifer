import openai from "@/services/openai";

export default async function generateUI(content: string) {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4-turbo-preview",
			stream: true,
			max_tokens: 4000,
			messages: [
				{
					role: "system",
					content:
						"You are a UI expert. You will be given a piece of content and be expected to create a clear and concise UI to render the content. Please use html and tailwindcss to create the UI. Make it look modern and incorporate colors when possible.",
				},
				{
					role: "user",
					content,
				},
			],
		});
		return response;
	} catch (error) {
		throw new Error(`${error}`);
	}
}
