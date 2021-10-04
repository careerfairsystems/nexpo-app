import { deleteAuth, getAuth, putAuth } from '../http/HttpHelpers';

export interface TicketRequest {
  "event_id": number,
  "photo": boolean,
}

export interface Ticket {
  ticket_code: string,
  photo: boolean,
  id: number,
  event_id: number
}

export const createTicket = async (TicketRequest: TicketRequest): Promise<Ticket> => {
  const response = await putAuth('/event/ticket', TicketRequest);
  console.log(response)
  const json = await response.json();
  const ticket = <Ticket>json.data;
  return ticket;
}

export const removeTicket = async (eventId: number): Promise<boolean> => {
  const response = await deleteAuth('/event/ticket/' + eventId, eventId);
  return response.ok;
}

export const getAllTickets = async (): Promise<Ticket[]> => {
  const response = await getAuth('/event/tickets');
  const json = await response.json();
  const tickets = <Ticket[]>json.data;
  return tickets;
}