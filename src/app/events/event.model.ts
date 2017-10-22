export class Event {
  id                    : string;
  name                  : string;
  description           : string;
  _participants         : Array<any>;
  participantCategories : Array<any>;
  createdAt             : Date;

  constructor(id: string,
              name: string,
              description: string,
              participants: Array<any>,
              participantCategories : Array<any>,
              createdAt: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this._participants = participants;
    this.participantCategories = participantCategories;
    this.createdAt = createdAt;
  }
}
