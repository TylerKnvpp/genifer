import openai from "@/services/openai";

export default async function generateSearchTerm(lastMessage: string) {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: false,
			max_tokens: 200,
			messages: [
				{
					role: "system",
					content:
						"You are an expert on generating search terms. You will be given a request by a user and be expected to create a clear and concise search term to help the user find the information they need.",
				},
				{
					role: "user",
					content: lastMessage,
				},
			],
		});
		return response.choices[0].message.content;
	} catch (error) {
		console.log(error);
		throw new Error(`${error}`);
	}
}
