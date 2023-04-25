import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../App";

/** Navigation bar that shows up on every page. */

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <Nav className="ms-auto">
                <LinkContainer to="/user/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/recipes/add">
                    <Nav.Link>New</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/recipes/public">
                    <Nav.Link>Public Recipes</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/recipes/search">
                    <Nav.Link>Search</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/">
                    <Nav.Link onClick={logout}>Log out {currentUser.username}</Nav.Link>
                </LinkContainer>
            </Nav>
        )
     };

    function loggedOutNav() {
        return (
            <Nav className="ms-auto">
                <LinkContainer to="/recipes/public">
                    <Nav.Link>Public Recipes</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/user/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/user/register">
                    <Nav.Link>Register</Nav.Link>
                </LinkContainer>
            </Nav>
        )
     };

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Recipe App</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {currentUser ? loggedInNav() : loggedOutNav()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;