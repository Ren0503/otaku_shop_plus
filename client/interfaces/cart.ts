export interface Cart {
	product: string
	name: string
	image: string
	price: number
	countInStock: number
	qty: number
}

export interface ShippingAddress {
	address: string
	city: string
	postalCode: string
	country: string
}