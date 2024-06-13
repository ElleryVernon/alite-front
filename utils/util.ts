import axios from "axios";
import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet(
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	7
);

export async function getChat(id: string, userId: string) {
	try {
		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
			params: {
				id,
				userId,
			},
		});

		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}
