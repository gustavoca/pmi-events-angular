export class Payment {
  id         : string;
  amount     : number;
  createdAt  : Date;

  constructor(id: string,
              amount: number,
              createdAt: Date) {
    this.id = id;
    this.amount = amount;
    this.createdAt = createdAt;
  }
}
