export class Participant {
  id          : number;
  names       : string;
  firstSurname: string;
  lastSurname : string;
  registeredAt: Date;
  phone       : number;
  email       : string;
  qrCode      : string;
  constructor(id          : number,
              names       : string,
              firstSurname: string,
              lastSurname : string,
              registeredAt: Date,
              phone       : number,
              email       : string,
              qrCode      : string) {
    this.id           = id;
    this.names        = names;
    this.firstSurname = firstSurname;
    this.lastSurname  = lastSurname;
    this.registeredAt = registeredAt;
    this.phone        = phone;
    this.email        = email;
    this.qrCode       = qrCode;
  }
}
