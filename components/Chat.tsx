"use client";

import { useChat, type Message } from "@ai-sdk/react";
import { usePathname, useRouter } from "next/navigation";

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[];
	id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
	const path = usePathname();
	const router = useRouter();
	const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
		api: `${process.env.NEXT_PUBLIC_API_URL}/chat-without-browsing`,
		initialMessages,
		id,
		body: {
			id,
		},
		onFinish() {
			if (!path.includes("chat")) {
				router.push(`/chat/${id}`, { scroll: false });
				router.refresh();
			}
		},
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
