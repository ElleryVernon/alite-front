import { Chat } from "@/components/Chat";
import { getChat } from "@/utils/util";
import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

const userId = "asd";

export interface ChatPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({ params }: ChatPageProps): Promise<Metadata> {
	const chat = (await getChat(params.id, userId)) || "Chat";
	console.log(chat);
	return {
		title: chat?.title?.toString()?.slice(0, 50) ?? "Chat",
	};
}

export default async function ChatPage({ params }: ChatPageProps) {
	const chat = await getChat(params.id, userId);

	if (!chat) {
		notFound();
	}

	if (chat?.userId !== userId) {
		notFound();
	}

	return <Chat id={chat.id} initialMessages={chat.messages} />;
}
