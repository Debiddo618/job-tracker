import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthedUserContext } from '../App';
import { useContext } from 'react';

const NavBar = (props) => {
    const user = useContext(AuthedUserContext);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="#home">
                <img
                alt=""
                src="/assets/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Job Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                {props.username ? (
                    <>
                        <Nav.Link>Hello {user.username}</Nav.Link>
                        <Nav.Link onClick={props.handleSignout}>Sign Out</Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Link onClick={() => props.handleShow('signin')}>Sign In</Nav.Link>
                        <Nav.Link onClick={() => props.handleShow('signup')}>Sign Up</Nav.Link>
                    </>
                )}
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;