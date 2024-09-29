export class AddressDTO {
    addressId!: number;
    houseNo!: string;
    street!: string;
    landmark!: string;
    pincode!: number;
    city!: string;
    state!: string;
    userId!: string;
    adminId!: number;
    sellerId!: number;
    customerId!: number;
  
    constructor(
      addressId: number,
      houseNo: string,
      street: string,
      landmark: string,
      pincode: number,
      city: string,
      state: string,
      userId: string,
      adminId: number,
      sellerId: number,
      customerId: number
    ) {
      this.addressId = addressId;
      this.houseNo = houseNo;
      this.street = street;
      this.landmark = landmark;
      this.pincode = pincode;
      this.city = city;
      this.state = state;
      this.userId = userId;
      this.adminId = adminId;
      this.sellerId = sellerId;
      this.customerId = customerId;
    }
  
    get AddressId(): number {
      return this.addressId;
    }
  
    set AddressId(addressId: number) {
      this.addressId = addressId;
    }
  
    get HouseNo(): string {
      return this.houseNo;
    }
  
    set HouseNo(houseNo: string) {
      this.houseNo = houseNo;
    }
  
    get Street(): string {
      return this.street;
    }
  
    set Street(street: string) {
      this.street = street;
    }
  
    get Landmark(): string {
      return this.landmark;
    }
  
    set Landmark(landmark: string) {
      this.landmark = landmark;
    }
  
    get Pincode(): number {
      return this.pincode;
    }
  
    set Pincode(pincode: number) {
      this.pincode = pincode;
    }
  
    get City(): string {
      return this.city;
    }
  
    set City(city: string) {
      this.city = city;
    }
  
    get State(): string {
      return this.state;
    }
  
    set State(state: string) {
      this.state = state;
    }
  
    get UserId(): string {
      return this.userId;
    }
  
    set UserId(userId: string) {
      this.userId = userId;
    }
  
    get AdminId(): number {
      return this.adminId;
    }
  
    set AdminId(adminId: number) {
      this.adminId = adminId;
    }
  
    get SellerId(): number {
      return this.sellerId;
    }
  
    set SellerId(sellerId: number) {
      this.sellerId = sellerId;
    }
  
    get CustomerId(): number {
      return this.customerId;
    }
  
    set CustomerId(customerId: number) {
      this.customerId = customerId;
    }
  }
  