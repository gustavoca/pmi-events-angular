export class Event {
  id                    : string;
  name                  : string;
  description           : string;
  _participants         : Array<any>;
  participantCategories : Array<any>;
  preSalePercentage     : number;

  constructor(id: string,
              name: string,
              description: string,
              preSalePercentage: number,
              participants: Array<any>,
              participantCategories : Array<any>) {
    this.id = id;
    this.name = name;
    this.description = description;
    this._participants = participants;
    this.preSalePercentage = preSalePercentage;
    this.participantCategories = participantCategories;
  }
}
