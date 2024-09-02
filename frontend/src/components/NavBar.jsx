import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = (props) => {
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
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link onClick={props.handleShow}>Sign Up</Nav.Link>
                <Nav.Link href="#link">Sign In</Nav.Link>
                <Nav.Link href="#link">Sign Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;