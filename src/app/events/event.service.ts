import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Event } from './event.model';
import { Participant } from './participant.model';
const BASEURL = 'http://localhost:3000/api/';

@Injectable()
export class EventService {
  private events: Array<Event> = [new Event(1, "Prueba", "bla blabla", 123, 5),
                                  new Event(2, "Prueba", "bla blabla", 123, 10)];


  private participants: Array<Participant> = [new Participant(1,  "Gustavo",
                                                                  "Calderón",
                                                                  "Añez",
                                                                  new Date(),
                                                                  70407545,
                                                                  "g.calderonxd@gmail.com",
                                                                  "1234")];

  constructor(private http: Http) {}

  allEvents() {
    return this.http.get(BASEURL + '/events').map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  save() {
  }

  allParticipantsByEventId(eventId: string) {
    return this.http.get(BASEURL + '/events' + `/${eventId}` + '/participants').map(
      (response: Response) => {
        let participants = response.json();
        return participants;
      }
    );
  }

  eventById(eventId: string) {
    return this.http.get(BASEURL + '/events' + `/${eventId}`).map(
      (response: Response) => {
        let event = response.json();
        return event;
      }
    );
  }
}
