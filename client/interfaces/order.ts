import { Cart, ShippingAddress } from '.'

export interface PaymentResult {
	id: string
	status: string
	update_time: string
	email_address: string
}

export interface Order {
	orderItems: Cart[]
	shippingAddress: ShippingAddress
	paymentMethod: string
	itemsPrice: number
	taxPrice: number
	shippingPrice: number
	totalPrice: number
	isPaid: boolean
	paidAt: Date
	isDelivered: boolean
	deliveredAt: Date
}

export interface OrderCreate extends Order {
	_id?: string
}
