export class Participant {
  id          : string;
  names       : string;
  firstSurname: string;
  lastSurname : string;
  registeredAt: Date;
  phone       : number;
  email       : string;
  qrCode      : string;
  categoryId  : string;
  modality    : string;
  socialReason: string;
  nit         : number;
  note        : string;
  constructor(id          : string,
              names       : string,
              firstSurname: string,
              lastSurname : string,
              registeredAt: Date,
              phone       : number,
              email       : string,
              qrCode      : string,
              categoryId  : string,
              modality    : string,
              socialReason: string,
              nit         : number,
              note        : string) {
    this.id           = id;
    this.names        = names;
    this.firstSurname = firstSurname;
    this.lastSurname  = lastSurname;
    this.registeredAt = registeredAt;
    this.phone        = phone;
    this.email        = email;
    this.qrCode       = qrCode;
    this.categoryId   = categoryId;
    this.modality     = modality;
    this.socialReason = socialReason;
    this.nit          = nit;
    this.note         = note;
  }
}
