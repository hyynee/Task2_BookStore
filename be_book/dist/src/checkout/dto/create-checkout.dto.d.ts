export declare class CheckoutItemDTO {
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
export declare class CheckoutDTO {
    userId: string;
    checkoutItems: CheckoutItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
    isPaid?: boolean;
    paidAt?: Date;
    paymentStatus?: string;
    paymentDetails?: any;
    isFinalized?: boolean;
    finalizedAt?: Date;
}
export declare class CreateCheckoutDTO {
    userId: string;
    checkoutItems: CheckoutItemDTO[];
    shippingAddress: ShippingAddressDTO;
    paymentMethod: string;
    totalPrice: number;
}
