import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FirstName } from "../firstName/firstName";
import { LastName } from "../lastName/lastName";
import { useAppDispatch } from '../../app/hooks';
import { setFirstName, setLastName } from "../../features/userSlice";

export const User = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          First Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter First Name"
          onChange={(e) => {
            dispatch(setFirstName(e.target.value));
          }}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Last Name
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter Last Name"
          onChange={(e) => {
            dispatch(setLastName(e.target.value));
          }}
        />
      </InputGroup>
      <div className="d-flex gap-5">
        <FirstName />
        <LastName />
      </div>
    </>
  );
};