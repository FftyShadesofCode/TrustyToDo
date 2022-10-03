import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { useToDoContext } from "../App";

const Header = () => {
  const { setData, data, searchValue, setSearchValue } = useToDoContext();
  const handleChange = (event) => {
    let searchString = event.target.value.toLowerCase();
    setSearchValue(searchString);
  };
  
  return (
    <Navbar bg="black" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='text-danger text-lg'>Trusty ToDo</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            name="search-area"
            className="me-2 bg-slate-500 text-red-700"
            aria-label="Search"
            value={searchValue}
            onChange={handleChange}
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
