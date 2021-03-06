import Link from 'next/link'
import React, { FunctionComponent } from 'react'
import { Pagination } from 'react-bootstrap'

interface PaginateProps {
    pages: number
    page: number
    keyword: string
}
const Paginate: FunctionComponent<PaginateProps> = ({ pages, page, keyword }) => {
    return pages > 1 ? (
        <Pagination>
            {[...Array(pages).keys()].map((x) => {
                const link = keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
                return (
                    <Link key={x + 1} href={link}>
                        <Pagination.Item as="a" href={link} active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </Link>
                )
            })}
        </Pagination>
    ) : null
}

export default Paginate
