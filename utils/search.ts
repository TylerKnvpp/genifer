import { serpapi } from "@/services/serpapi";
import visitPageAndGrabContent from "./visitPageAndGrabContent";
import summarizeContent from "./summarizeContent";
import doesFulfillRequest from "./doesFulfillRequest";
import summarizeJSON from "./summarizeJSON";

export default async function search(searchTerm: string, userRequest: string) {
	let summary = "";
	try {
		// find relevant links
		console.log("Finding relevant links...");
		const response = await serpapi(searchTerm);

		delete response?.pagination;
		delete response?.related_questions;
		delete response?.related_searches;
		delete response?.search_metadata;
		delete response?.search_parameters;
		delete response?.search_information;
		delete response?.dmca_messages;

		const organic_results = response?.organic_results?.splice(0, 3);
		const parsedResponse = { ...response, organic_results };
		console.log(parsedResponse);

		const stringifiedResponse = JSON.stringify(parsedResponse);
		console.log("Stringified response...", stringifiedResponse.length);
		const summarizedJson = await summarizeJSON(
			stringifiedResponse,
			userRequest
		);
		console.log(`Found ${response?.organic_results} relevant links`);

		if (summarizedJson) {
			console.log("Summarized JSON...", summarizedJson);
			const jsonSummaryFulfillsRequest = await doesFulfillRequest(
				summarizedJson as string,
				userRequest
			);

			if (jsonSummaryFulfillsRequest) {
				return summarizedJson;
			}
		}

		// create an array with the links
		const links = response?.organic_results
			?.slice(0, 3)
			.map((result: any) => result.link);

		for (let link of links) {
			// use puppeteer to visit the links and grab the content
			console.log("Visiting link...", link);
			let content = "";
			try {
				content = await visitPageAndGrabContent(link);
			} catch (error) {
				continue;
			}
			// use OpenAI to summarize the content
			console.log("Summarizing content...");
			const summaryOfContent = await summarizeContent(content, link);
			console.log("Content summarized...", summaryOfContent?.substring(0, 100));
			// prompt OpenAI API to see if the information is relevant
			console.log("Checking if content fulfills request...");
			const fulfillsRequest = await doesFulfillRequest(
				summaryOfContent as string,
				userRequest
			);
			console.log("Content fulfills request?", fulfillsRequest);

			if (fulfillsRequest) {
				// if relevant, exit loop and return a summary of the link
				console.log("Content fulfills request. Returning summary...");
				summary = summaryOfContent as string;
				break;
			} else {
				// if not relevant, continue to the next link
				console.log(
					"Content does not fulfill request. Continuing to next link..."
				);
				continue;
			}
		}
		return summary;
	} catch (error) {
		console.log(error);
		throw new Error(`${error}`);
	}
}
