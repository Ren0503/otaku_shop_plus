import Link from 'next/link'
import React, { FunctionComponent, useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { listTopProducts, ProductTopRatedState } from 'reducers/product'
import { Loader, Message } from 'components/shared'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'


const ProductCarousel: FunctionComponent = () => {
    const dispatch = useAppDispatch()

    const productTopRated = useSelector(
        (state: ReduxState) => state.productTopRated as ProductTopRatedState
    )
    const { loading, products, error } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark">
            {products?.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link href={`/product/${product._id}`} passHref>
                        <a>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className="carousel-caption">
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </a>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
