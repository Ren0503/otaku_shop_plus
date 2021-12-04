import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'

import { Product as ProductType } from 'interfaces/product'
import Rating from './Rating'

interface ProductProps {
    product: ProductType
}
const Product: FunctionComponent<ProductProps> = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link href={`/product/${product._id}`}>
                <Card.Img src={product.image}></Card.Img>
            </Link>
            <Card.Body>
                <Link href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
