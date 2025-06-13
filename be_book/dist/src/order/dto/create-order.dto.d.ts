export declare class OrderItemDTO {
    bookId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}
export declare class ShippingAddressDTO {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}
export declare class OrderDTO {
    userId: string;
    items: OrderItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
    isPaid?: boolean;
    paidAt?: Date;
    isDelivered?: boolean;
    deliveredAt?: Date;
    paymentStatus?: string;
    status?: string;
}
export declare class CreateOrderDTO {
    userId: string;
    items: OrderItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
}
