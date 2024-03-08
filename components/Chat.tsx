import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import parse from "html-react-parser";

export default function Chat() {
	const messagesRef = useRef<HTMLDivElement>(null);
	const { messages, input, isLoading, handleInputChange, handleSubmit } =
		useChat({
			onResponse: (response) => {
				if (messagesRef.current) {
					messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
				}
			},
		});

	useEffect(() => {
		if (messagesRef.current) {
			messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
		}
	}, [messages]);

	console.log(messages.length ? messages[messages.length - 1].content : "");

	return (
		<div className="w-[90%] xl:w-1/2 mx-auto my-24">
			<div
				className="flex flex-col h-[700px] xl:h-[800px] overflow-scroll px-3"
				ref={messagesRef}
				id="messages-container"
			>
				<div className="py-2 px-3 rounded-lg bg-gray-200 text-slate-700 max-w-xs mx-2 my-6">
					What can I do for you?
				</div>

				{messages.map((m, index) => {
					if (m.role === "user") {
						return (
							<div
								className="py-2 px-3 my-6 rounded-lg bg-blue-500 text-white max-w-xs ml-auto"
								key={m.id}
							>
								{m.content}
							</div>
						);
					}

					return (
						<div
							key={m.id}
							className="py-2 px-3 rounded-lg bg-gray-200 text-slate-700 w-full mx-2 my-6 last:mb-24"
						>
							{parse(m.content.replaceAll("```html", "").replaceAll("```", ""))}
						</div>
					);
				})}

				{isLoading && (
					<div className="py-2 px-3 rounded-lg bg-gray-200 text-slate-700 w-[50px] text-center mx-2 my-6 mb-24">
						...
					</div>
				)}
			</div>

			<div className="fixed bottom-10 w-screen">
				<form onSubmit={handleSubmit}>
					<input
						value={input}
						placeholder="Say something..."
						className="p-3 rounded-md w-[90%] xs:w-1/2 lg:w-1/2 border border-gray-200 text-black"
						onChange={handleInputChange}
					/>
				</form>
			</div>
		</div>
	);
}
