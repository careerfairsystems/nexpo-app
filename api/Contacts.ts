import { getAuth } from "./_HttpHelpers";

export interface Contact {
	id: number;
	firstName: string;
	lastName: string;
	roleInArkad: string;
	email: string;
	phoneNumber: string;
}

export const contacts = async (): Promise<Contact[]> => {
	const response = await getAuth("/contacts");
	const json = await response.json();
	const contacts = json as Contact[];
	return contacts;
};
