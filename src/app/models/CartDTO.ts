export class CartDTO {
    cartId!: number;
    customerDetailsId!: number;
    productId!: string;
    quantity!: number;
    creationTime!: string;
  
    constructor(
      cartId: number,
      customerDetailsId: number,
      productId: string,
      quantity: number,
      creationTime: string
    ) {
      this.cartId = cartId;
      this.customerDetailsId = customerDetailsId;
      this.productId = productId;
      this.quantity = quantity;
      this.creationTime = creationTime;
    }
  
    get CartId(): number {
      return this.cartId;
    }
  
    set CartId(cartId: number) {
      this.cartId = cartId;
    }
  
    get CustomerDetailsId(): number {
      return this.customerDetailsId;
    }
  
    set CustomerDetailsId(customerDetailsId: number) {
      this.customerDetailsId = customerDetailsId;
    }
  
    get ProductId(): string {
      return this.productId;
    }
  
    set ProductId(productId: string) {
      this.productId = productId;
    }
  
    get Quantity(): number {
      return this.quantity;
    }
  
    set Quantity(quantity: number) {
      this.quantity = quantity;
    }
  
    get CreationTime(): string {
      return this.creationTime;
    }
  
    set CreationTime(creationTime: string) {
      this.creationTime = creationTime;
    }
  }
  