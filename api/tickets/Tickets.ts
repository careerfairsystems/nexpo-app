import { deleteAuth, getAuth, postAuth } from '../http/_HttpHelpers';

export interface CreateTicketDto {
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

/**
 * Create a new ticket for an event.
 */
export const createTicket = async (TicketRequest: CreateTicketDto): Promise<Ticket> => {
  const response = await postAuth('/tickets', TicketRequest);
  const json = await response.json();
  const ticket = json as Ticket;
  return ticket;
}

/**
 * Remove/Unregister a ticket
 */
export const removeTicket = async (ticketId: number): Promise<boolean> => {
  const response = await deleteAuth(`/tickets/${ticketId}`);
  return response.ok;
}

/**
 * Get all tickets for the signed in user
 */
export const getAllTickets = async (): Promise<Ticket[]> => {
  const response = await getAuth('/tickets');
  const json = await response.json();
  const tickets = json as Ticket[];
  return tickets;
}

/**
 * Get a single ticket by id
 */
export const getTicket = async (ticketId: number): Promise<Ticket> => {
  const response = await getAuth(`/tickets/${ticketId}`);
  const json = await response.json();
  const ticket = json as Ticket;
  return ticket;
}
