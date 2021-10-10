import { deleteAuth, getAuth, putAuth } from '../http/HttpHelpers';

export interface TicketRequest {
  eventId: number;
  photoOk: boolean;
}

export interface Ticket {
  id: number,
  code: string,
  photoOk: boolean,
  eventId: number,
  userId: number
}

export const createTicket = async (TicketRequest: TicketRequest): Promise<Ticket> => {
  const response = await putAuth('/tickets', TicketRequest);
  console.log(response)
  const json = await response.json();
  const ticket = json as Ticket;
  return ticket;
}

export const removeTicket = async (ticketId: number): Promise<boolean> => {
  const response = await deleteAuth(`/tickets/${ticketId}`);
  return response.ok;
}

export const getAllTickets = async (): Promise<Ticket[]> => {
  const response = await getAuth('/tickets');
  const json = await response.json();
  const tickets = json as Ticket[];
  return tickets;
}
