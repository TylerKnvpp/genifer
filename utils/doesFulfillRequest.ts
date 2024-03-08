import openai from "@/services/openai";

export default async function doesFulfillRequest(
	content: string,
	userRequest: string
) {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: false,
			max_tokens: 1000,
			messages: [
				{
					role: "system",
					content:
						"Compare a summary to a user's request and determine if the content fulfills the user's request. If it does, return a boolean value of true. If it does not, return a boolean value of false.",
				},
				{
					role: "user",
					content: `User's Request: ${userRequest} | Content: ${content} | Does the content fulfill the user's request?`,
				},
			],
			tools: [
				{
					type: "function",
					function: {
						name: "doesFulfillRequest",
						description:
							"Determine if the provided answer fulfills the user's request.",
						parameters: {
							type: "object",
							properties: {
								doesFulfill: {
									type: "boolean",
									description:
										"Return the boolean value of true if the answer fulfills the user's request. Return the boolean value of false if the answer does not fulfill the user's request.",
								},
							},
							required: ["content"],
						},
					},
				},
			],
		});

		const toolCalls = response?.choices[0]?.message?.tool_calls;

		if (toolCalls?.length) {
			const workflowWithArgs = toolCalls[0].function;

			if (workflowWithArgs) {
				if (workflowWithArgs.name === "doesFulfillRequest") {
					const parsedArguments = JSON.parse(workflowWithArgs.arguments);
					return parsedArguments.doesFulfill;
				} else {
					throw new Error("The tool call was not found in the response.");
				}
			} else {
				throw new Error("The tool call was not found in the response.");
			}
		} else {
			throw new Error("The tool call was not found in the response.");
		}
	} catch (error) {
		throw new Error(`${error}`);
	}
}
