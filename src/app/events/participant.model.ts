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
  attended          : boolean;
  lunch             : boolean;
  discount          : number;

  constructor(id?          : string,
              names?       : string,
              firstSurname?: string,
              lastSurname? : string,
              registeredAt?: Date,
              phone?       : number,
              lunch?       : boolean,
              discount?    : number,
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
    this.lunch        = lunch;
    this.discount     = discount ? discount : 0;
  }

  totalToPay() {
    let total = 0;
    if(this.lunch) total += 70;
    if (this.modality == Modality.Sale) {
      total += this.category.price;
    }
    else {
      total += this.category.presalePrice;
    }
    if(!!this.discount) total -= this.discount;
    return total;
  }

  get fullName() {
    return `${this.names} ${this.firstSurname} ${this.lastSurname}`;
  }

  toPay() {
    return this.totalToPay();
  }

  totalPaid() {
    return this._payments ? this._payments.reduce((result, payment) => result + payment.amount, 0) : 0;
  }

  leftToPay() {
    return this.toPay() - this.totalPaid();
  }
}
