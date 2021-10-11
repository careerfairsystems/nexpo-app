import { get } from '../http/HttpHelpers';
import { getAllTickets, Ticket } from '../tickets';
import { format } from "date-fns";

export interface Event {
  id: number,
  name: string,
  description: string,
  date: string,
  start: string,
  end: string,
  location: string,
  host: string,
  language: string,
  capacity: number,
  ticketCount: number,
}

export function formatTime(date: string, start: string, end: string): string {
  if(date == "") {
    return ""
  }
  var clock: string = start + " - " + end
  var d: Date = new Date(date)
  try {
    const dateString = format(d, "LLL d") + "  :  " + clock;
    if(clock != "") {
      dateString + "  :  " + clock;
    }
    return dateString;
  } catch(RangeError) {
    return ""
  }
}

export const bookedEvent = async (event: Event): Promise<boolean> => {
  const regEvents = await getAllTickets();
  for(var i = 0; i < regEvents.length; i++) {
    if(event.id == regEvents[i].eventId) {
      return true;
    }
  }
  return false
}

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await get('/events');
  const json = await response.json();
  const events = json as Event[];
  return events;
}

export const getEvent = async (id: number): Promise<Event> => {
  const response = await get(`/events/${id}`);
  const json = await response.json();
  const event = json as Event;
  return event;
}

// Note: getBookedEvents is slow and should not be used repeatedly
export const getBookedEvents = async (): Promise<Event[]> => {
  const events: Event[] = await getAllEvents();
  const tickets: Ticket[] = await getAllTickets();
  const regEvents: Event[] = [];

  if(tickets == undefined || events == undefined) {
    return regEvents;
  }

  for(let i1 = 0; i1 < tickets.length; i1++) {
    for(let i2 = 0; i2 < events.length; i2++) {
      if(tickets[i1].eventId == events[i2].id) {
        regEvents.push(events[i2]);
      }
    }
  }
  return regEvents;
}
