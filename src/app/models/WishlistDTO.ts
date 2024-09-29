export class WishlistDTO {
    wishlistId!: number;
    productId!: string;
    customerDetailsId!: number;
    liked!: boolean;
    creationTime!: string;
  
    constructor(
      wishlistId: number,
      productId: string,
      customerDetailsId: number,
      liked: boolean,
      creationTime: string
    ) {
      this.wishlistId = wishlistId;
      this.productId = productId;
      this.customerDetailsId = customerDetailsId;
      this.liked = liked;
      this.creationTime = creationTime;
    }
  
    get WishlistId(): number {
      return this.wishlistId;
    }
  
    set WishlistId(wishlistId: number) {
      this.wishlistId = wishlistId;
    }
  
    get ProductId(): string {
      return this.productId;
    }
  
    set ProductId(productId: string) {
      this.productId = productId;
    }
  
    get CustomerDetailsId(): number {
      return this.customerDetailsId;
    }
  
    set CustomerDetailsId(customerDetailsId: number) {
      this.customerDetailsId = customerDetailsId;
    }
  
    get Liked(): boolean {
      return this.liked;
    }
  
    set Liked(liked: boolean) {
      this.liked = liked;
    }
  
    get CreationTime(): string {
      return this.creationTime;
    }
  
    set CreationTime(creationTime: string) {
      this.creationTime = creationTime;
    }
  }
  