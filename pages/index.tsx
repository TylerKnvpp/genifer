import Chat from "@/components/Chat";

export default function Home() {
	return (
		<main className={`flex flex-col max-h-screen`}>
			<h1 className="text-4xl m-8 font-black tracking-tighter">Genifer</h1>

			<Chat />
		</main>
	);
}
