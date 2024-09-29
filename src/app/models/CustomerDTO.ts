import { AddressDTO } from "./AddressDTO";
import { CartDTO } from "./CartDTO";
import { WishlistDTO } from "./WishlistDTO";

export class CustomerDTO {
    private customerId!: number;
      private userId!: string;
      private premiumCustomer!: string;
      private wishlistDTOS!: WishlistDTO[];
      private cartDTOS!: CartDTO[];
      private deliveryAddressesDTO!: AddressDTO[];
    constructor(
      customerId: number,
      userId: string,
      premiumCustomer: string,
      wishlistDTOS: WishlistDTO[],
      cartDTOS: CartDTO[],
      deliveryAddressesDTO: AddressDTO[]
    ) {
      this.customerId = customerId;
      this.userId = userId;
      this.premiumCustomer = premiumCustomer;
      this.wishlistDTOS = wishlistDTOS;
      this.cartDTOS = cartDTOS;
      this.deliveryAddressesDTO = deliveryAddressesDTO;
    }
  
  public get getCustomerId(): number {
    return this.customerId;
  }

  public set setCustomerId(customerId: number) {
      this.customerId = customerId;
  }

  public get getUserId(): string {
      return this.userId;
  }

  public set setUserId(userId: string) {
      this.userId = userId;
  }

  public get getPremiumCustomer(): string {
      return this.premiumCustomer;
  }

  public set setPremiumCustomer(premiumCustomer: string) {
      this.premiumCustomer = premiumCustomer;
  }

  public get getWishlistDTOS(): WishlistDTO[] {
      return this.wishlistDTOS;
  }

  public set setWishlistDTOS(wishlistDTOS: WishlistDTO[]) {
      this.wishlistDTOS = wishlistDTOS;
  }

  public get getCartDTOS(): CartDTO[] {
      return this.cartDTOS;
  }

  public set setCartDTOS(cartDTOS: CartDTO[]) {
      this.cartDTOS = cartDTOS;
  }

  public get getDeliveryAddressesDTO(): AddressDTO[] {
      return this.deliveryAddressesDTO;
  }

  public set setDeliveryAddressesDTO(deliveryAddressesDTO: AddressDTO[]) {
      this.deliveryAddressesDTO = deliveryAddressesDTO;
  }
  }
  