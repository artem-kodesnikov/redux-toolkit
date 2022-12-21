import React from "react";
import { useAppSelector } from "../../app/hooks";


export const FirstName = () => {
  const name = useAppSelector((state) => state.user.firstName);
  return (
    <div className="">
      <h4>First Name:</h4>
      <p>{name || 'Enter Name'}</p>
    </div>
  );
};