import { get } from "./_HttpHelpers";
import { getAllTickets, Ticket } from "./Tickets";
import { addDays, format, isAfter, subDays } from "date-fns";

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  type: number;
  start: string;
  end: string;
  location: string;
  host: string;
  language: string;
  capacity: number;
  ticketCount: number;
}

export function formatTime(date: string, start: string, end: string): string {
  if (date == "") {
    return "";
  }
  start = start.substring(0, 5);
  end = end.substring(0, 5);
  var clock: string = start + " - " + end;
  var d: Date = new Date(date);
  try {
    const dateString = format(d, "LLL d") + "  :  " + clock;
    if (clock != "") {
      dateString + "  :  " + clock;
    }
    return dateString;
  } catch (RangeError) {
    return "N/A";
  }
}

export const bookedEvent = async (event: Event): Promise<boolean> => {
  const regEvents = await getAllTickets();
  for (var i = 0; i < regEvents.length; i++) {
    if (event.id == regEvents[i].eventId) {
      return true;
    }
  }
  return false;
};

/**
 * Get all events
 */
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await get("/events");
  const json = await response.json();
  const events = json as Event[];
  return events;
};

export function getUpcomingEvents(allEvents: Event[]): Event[] {
  const now: Date = subDays(new Date(), 1);

  return allEvents.filter((event) => {
    return !hasHappened(event, now);
  });
}

/**Used to filter Events which are not relevant anymore.
 * @param event Given Event object to compare to.
 * @param now Date object referring to this moment.
 * @returns True if the event has ended.
 */
function hasHappened(event: Event, now: Date): boolean {
  try {
    let date: Date = new Date(event.date);
    addDays(date, 1);
    return isAfter(now, date);
  } catch (e: any) {
    console.log("RangeError occurred when parsing event date: " + e);
    return true;
  }
}

/**
 * Get a single event
 */
export const getEvent = async (eventId: number): Promise<Event> => {
  const response = await get(`/events/${eventId}`);
  const json = await response.json();
  const event = json as Event;
  return event;
};

// Note: getBookedEvents is slow and should not be used repeatedly
export const getBookedNotScannedEvents = async (): Promise<Event[]> => {
  const events: Event[] = await getAllEvents();
  const tickets: Ticket[] = await getAllTickets();
  const regEvents: Event[] = [];

  if (tickets == undefined || events == undefined) {
    return regEvents;
  }

  for (let i1 = 0; i1 < tickets.length; i1++) {
    for (let i2 = 0; i2 < events.length; i2++) {
      if (tickets[i1].eventId == events[i2].id && tickets[i1].isConsumed === false) {
        regEvents.push(events[i2]);
      }
    }
  }
  return regEvents;
};
