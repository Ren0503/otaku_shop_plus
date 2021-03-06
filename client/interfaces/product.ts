export interface Product {
	_id: string
	name: string
	image: string
	description: string
	brand: string
	genres: string
	character: string
	size: string
	series: string
	price: number
	countInStock: number
	soldOut: number
	rating: number
	numReviews: number
	reviews: Array<Review>
}

export interface Review {
	_id: string
	user: string
	name: string
	rating: number
	comment: string
	createdAt: string
}

export interface ProductList {
	products: Product[]
	pages: number
	page: number
}

export interface CreateReviewInput {
	rating: number
	comment: string
}