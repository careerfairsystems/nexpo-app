import { getAuth } from "./_HttpHelpers";

export interface FAQs {
	id: number;
	question: string;
	answer: string;
}

export const faq = async (): Promise<FAQs[]> => {
	const response = await getAuth("/faq");
	const json = await response?.json();
	const faq = json as FAQs[];
	return faq;
};
