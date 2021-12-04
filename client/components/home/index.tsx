import Link from 'next/link'
import React, { FunctionComponent, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { listProducts, ProductListState } from 'reducers/product'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'

import { Meta, Loader, Message } from 'components/shared'

import { Paginate, ProductCarousel, Product } from 'components/products'

interface HomeProps {
    keyword?: string
    pageNumber?: number
}

const HomeComponent: FunctionComponent<HomeProps> = ({ keyword = '', pageNumber = 1 }) => {
    const dispatch = useAppDispatch()
    const productList = useSelector((state: ReduxState) => state.productList as ProductListState)
    const { loading, products, error, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts({ keyword, pageNumber }))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link href="/">
                    <a className="btn btn-light">Go Back</a>
                </Link>
            )}
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        page={page}
                        pages={pages}
                        keyword={keyword}
                    />
                </>
            )}
        </>
    )
}

export default HomeComponent
