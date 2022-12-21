import React from "react";
import { useAppSelector } from "../../app/hooks";

export const LastName = () => {
  const lastName = useAppSelector((state) => state.user.lastName);
  return (
    <div>
      <h4>Last Name:</h4>
      <p>{lastName || 'Enter Last Name'}</p>
    </div>
  );
};