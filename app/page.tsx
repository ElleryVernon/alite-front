"use client";

import { useChat } from "@ai-sdk/react";

export default function Page() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
		api: `${process.env.NEXT_PUBLIC_API_URL}/chat-without-browsing`,
	});

	return (
		<main className="mx-8">
			{messages.map((message) => (
				<div key={message.id} className="border w-fit border-gray-500 rounded-lg my-3 py-2 px-4">
					{message.role === "user" ? "User: " : "AI: "}
					{message.content}
				</div>
			))}
			<form onSubmit={handleSubmit}>
				<input
					name="prompt"
					value={input}
					onChange={handleInputChange}
					id="input"
					className="border border-gray-500"
				/>
				<button type="submit" className="border border-gray-500">
					Submit
				</button>
			</form>
		</main>
	);
}
