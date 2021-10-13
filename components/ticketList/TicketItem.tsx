import { Ticket } from "../../api/tickets";
import { Event } from '../../api/events/Events';

export type TicketItem = {
  ticket: Ticket;
  event: Event;
}