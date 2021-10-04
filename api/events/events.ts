import { deleteAuth, getAuth, putAuth } from '../http/HttpHelpers';

export interface ListedEvent {
  start: string,
  name: string,
  location: string,
  id: number,
  end: string,
  date: string,
  capacity: number,
  tickets: number,
}

export interface SingleEvent {
  tickets: number,
  start: string,
  name: string,
  location: string,
  id: number,
  event_info: {
    capacity: number,
    language: string,
    id: number,
    host: string,
    description: string
  },
  end: string,
  date: string,
}

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

export const getAllEvents = async (): Promise<ListedEvent[]> => {
  const response = await getAuth('/events');
  const json = await response.json();
  const events = <ListedEvent[]>json.data;
  return events;
}

export const getSingleEvent = async (id: number): Promise<SingleEvent> => {
  const response = await getAuth('/event/' + id);
  const json = await response.json();
  const event = <SingleEvent>json.data;
  return event;
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