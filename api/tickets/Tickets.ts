import { deleteAuth, getAuth, postAuth, putAuth } from '../http/_HttpHelpers';
import { Event } from '../events/Events'

export interface CreateTicketDto {
  eventId: number;
  photoOk: boolean;
}

export interface Ticket {
  id: number;
  code: string;
  photoOk: boolean;
  isConsumed: boolean;
  eventId: number;
  event: Event;
  userId: number;
}

export interface UpdateTicketDto {
  isConsumed: boolean;
}

/**
 * @param Event The event related to the ticket. 
 * @returns the ticket which is booked to the given event. 
 * If it is not booked then this function returns null.
 */
export async function getTicketForEvent(event: Event): Promise<Ticket | null> {
  const tickets = await getAllTickets();
  const evId = event.id
  for (var i = 0; i < tickets.length; i++) {
    if(evId == tickets[i].eventId) {
      return tickets[i];
    }
  }
  return null;
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
 * Get a single ticket by ticket code
 */
export const getTicket = async (code: string): Promise<Ticket> => {
  const response = await getAuth(`/tickets/${code}`);
  const json = await response.json();
  const ticket = json as Ticket;
  return ticket;
}

/**
 * Update a ticket, eg set the consumed flag
 */
export const updateTicket = async (code: string, dto: UpdateTicketDto): Promise<Ticket> => {
  const response = await putAuth(`/tickets/${code}`, dto);
  const json = await response.json();
  const ticket = json as Ticket;
  return ticket;
}
