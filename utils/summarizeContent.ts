import openai from "@/services/openai";

export default async function summarizeContent(content: string, link: string) {
	try {
		const shortenedContent =
			content.length > 5000 ? content.substring(0, 5000) : content;
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: false,
			max_tokens: 200,
			messages: [
				{
					role: "system",
					content:
						"You are an expert on summarizing content. You will be given a piece of content and be expected to create a clear and concise summary of the content. Provide the link within the summary.",
				},
				{
					role: "user",
					content: `${shortenedContent} | link`,
				},
			],
		});
		return response.choices[0].message.content;
	} catch (error) {
		throw new Error(`${error}`);
	}
}
