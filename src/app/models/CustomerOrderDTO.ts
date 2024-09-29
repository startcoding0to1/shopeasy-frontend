export interface CustomerOrderDTO{
    orderId:number,
    customerId:number,
    productId:string,
    totalPrice:number,
    orderStatus:string,
    deliverStatus:string,
    deliverDate:string,
    paymentStatus:string,
    address:string,
    orderPlacedTime:string,
    lastUpdate:string,
    feedBack:string    
}