import { Ticket } from "@/api/tickets";
import { Event } from '@/api/Events';

export type TicketItem = {
  ticket: Ticket;
  event: Event;
}