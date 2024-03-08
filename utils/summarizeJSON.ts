import openai from "@/services/openai";

export default async function summarizeJSON(
	content: string,
	userRequest: string
) {
	try {
		const shortenedContent = content.substring(0, 2000);
		const response = await openai.chat.completions.create({
			model: "gpt-4-turbo-preview",
			stream: false,
			max_tokens: 4000,
			messages: [
				{
					role: "system",
					content:
						"You are an expert on answering questions based on a given JSON object. You will be given a JSON object and user request and be expected to create a clear and concise answer from the JSON. Please answer the question and provide details. Do not mention you are summarizing JSON. Include the urls to relevant images and other relevant content. Include video links, preferably from youtube.",
				},
				{
					role: "user",
					content: `User Request: ${userRequest} | JSON: ${shortenedContent}`,
				},
			],
		});
		return response.choices[0].message.content;
	} catch (error) {
		throw new Error(`${error}`);
	}
}
