export class ParticipantCategory {
  id          : string;
  name        : string;
  price       : number;
  presalePrice: number;
  constructor(id: string, name: string, price: number, presalePrice: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.presalePrice = presalePrice;
  }
}
