import { Ticket } from "api/Tickets";
import { Event } from 'api/Events';

export type TicketItem = {
  ticket: Ticket;
  event: Event;
}