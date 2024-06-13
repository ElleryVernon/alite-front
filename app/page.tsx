"use client";

import { Chat } from "@/components/Chat";
import { nanoid } from "@/utils/util";
import { useChat } from "@ai-sdk/react";

export default function Page() {
	const id = nanoid();

	return <Chat id={id} />;
}
