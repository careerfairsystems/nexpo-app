import { getAuth } from "./_HttpHelpers";

export interface Contact {
    Id: number,
    FirstName: string,
    LastName: string,
    RoleInArkad: string,
    Email: string,
    PhoneNumber: string,
  }

export const contacts = async (): Promise<Contact[]> => {
  const response = await getAuth("/contacts");
  const json = await response.json();
  const contacts = json as Contact[];
  console.log(contacts)
  return contacts;
};

