import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Appbar.css";
import { Link } from "react-router-dom";



function Appbar() {
  return (

    <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: 0, background: "linear-gradient(to right, #ccffff 0%, #0099ff 100%)" }} sticky="top" >
      <Container fluid className="nav-container" style={{}} >
        <Link to="/" className="navitem">
          <Navbar.Brand className="imagelogo">
            <img
              alt="logo"
              src="https://privacy-policy-shikshakpro.care4edu.com/policyHeader.png"
              height="60"
              width="120"
            ></img>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "1000px" }}>
            <Link to="/" className="navitem" key='Home'>
              <Nav.Item>Home</Nav.Item>
            </Link>
            <Link to='Advertise' className="navitem" key='Advertise'>
              <Nav.Item>Advertise</Nav.Item>
            </Link>
            <Link to='StoreRegister' className="navitem" key='Image'>
              <Nav.Item>StoreRegister</Nav.Item>
            </Link>
            <Link to='/StoreProduct' className="navitem" key='Image'>
              <Nav.Item>StoreProduct</Nav.Item>
            </Link>
           
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button style={{backgroundColor:"white", color:"rgb(40, 74, 80)", border:"2px solid rgb(40, 74, 80)"}}>Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;
