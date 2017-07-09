import { Event } from './event.model';

export class EventService {
  private events: Array<Event> = [new Event(1, "Prueba", "bla blabla", 123),
                                  new Event(2, "Prueba", "bla blabla", 123)];

  allEvents() {
    return this.events;
  }
}
