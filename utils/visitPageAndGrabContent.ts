import puppeteer from "puppeteer";

export default async function visitPageAndGrabContent(link: string) {
	try {
		console.log("Launching browser...");
		const browser = await puppeteer.launch();
		console.log("Browser launched. Opening page...");
		const page = await browser.newPage();
		console.log("Page opened. Going to link...", link);
		await page.goto(link);
		console.log("On page. Grabbing content...", link);
		let content = await page.evaluate(() => document.body.innerText);
		console.log("Content grabbed. Cleaning content...");
		content = content.replace(/[^\w\s]/gi, "");
		console.log("Content cleaned. Closing browser...");
		await browser.close();
		return content;
	} catch (error) {
		throw new Error(`${error}`);
	}
}
