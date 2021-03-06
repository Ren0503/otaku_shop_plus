import Link from 'next/link'
import React, { FunctionComponent, useCallback } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { logout } from 'reducers/user'
import { ReduxState } from 'store'
import { useAppDispatch } from 'hooks'
import SearchBox from './SearchBox'

const Header: FunctionComponent = () => {
    const userLogin = useSelector((state: ReduxState) => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useAppDispatch()
    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])
    return (
        <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <Link href="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">
                            <Link href="/cart">
                                <Nav.Link as="a" href="/cart">
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <Link href="/profile">
                                        <NavDropdown.Item as="a" href="/profile">
                                            Profile
                                        </NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Link href="/login">
                                    <Nav.Link as="a" href="/login">
                                        <i className="fas fa-user"></i> Login
                                    </Nav.Link>
                                </Link>
                            )}
                            {userInfo?.isAdmin && (
                                <NavDropdown title={'Admin'} id="adminmenu">
                                    <Link href="/admin/userlist">
                                        <NavDropdown.Item as="a" href="/admin/userlist">
                                            Users
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/admin/productlist">
                                        <NavDropdown.Item as="a" href="/admin/productlist">
                                            Products
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/admin/orderlist">
                                        <NavDropdown.Item as="a" href="/admin/orderlist">
                                            Orders
                                        </NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
