export const Modality = {
    Sale: "Venta",
    PreSale: "Pre-venta"
}

export class Participant {
  id                : string;
  names             : string;
  firstSurname      : string;
  lastSurname       : string;
  registeredAt      : Date;
  phone             : number;
  email             : string;
  qrCode            : string;
  categoryId        : string;
  modality          : string;
  socialReason      : string;
  nit               : number;
  note              : string;
  _payments         : Array<any>;
  category          : any;
  preSalePercentage : number;
  attended          : boolean;

  constructor(id?          : string,
              names?       : string,
              firstSurname?: string,
              lastSurname? : string,
              registeredAt?: Date,
              phone?       : number,
              email?       : string,
              qrCode?      : string,
              categoryId?  : string,
              modality?    : string,
              socialReason?: string,
              attended?   : boolean,
              nit?         : number,
              note?        : string,
              payments?     : Array<any>) {
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
    this.attended     = attended;
    this._payments    = payments;
  }

  totalToPay() {
    return this.category.price;
  }

  discount() {
    if (this.modality == Modality.Sale) return 0;
    return this.totalToPay() * (this.preSalePercentage / 100);
  }

  toPay() {
    return this.totalToPay() - this.discount();
  }

  totalPaid() {
    return this._payments ? this._payments.reduce((result, payment) => result + payment.amount, 0) : 0;
  }

  leftToPay() {
    return this.toPay() - this.totalPaid();
  }
}
