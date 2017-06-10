export class Event {
  id          : number;
  name        : string;
  description : string;
  participants: number;
  constructor(id: number, name: string, description: string, participants: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.participants = participants;
  }
}
