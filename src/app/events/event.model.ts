export class Event {
  id                : number;
  name              : string;
  description       : string;
  participants      : number;
  preSalePercentage : number;

  constructor(id: number, name: string, description: string, participants: number, preSalePercentage: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.participants = participants;
    this.preSalePercentage = preSalePercentage;
  }
}
