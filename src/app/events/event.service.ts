import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Event } from './event.model';
import { Participant } from './participant.model';
const BASEURL = 'http://localhost:3000/api/';

@Injectable()
export class EventService {
  constructor(private http: Http) {}

  allEvents() {
    return this.http.get(BASEURL + '/events').map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  save(event) {
    return this.http.post(BASEURL + '/events', event).map(
      (response: Response) => {
        return "success";
      }
    );
  }

  update(event) {
    return this.http.put(BASEURL + '/events', event).map(
      (response: Response) => {
        return "success";
      }
    );
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
