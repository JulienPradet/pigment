import React from "react";
import Card from "../Card";

const TitledCard = ({ title, children }) => {
  return (
    <Card>
      <h2>{title}</h2>
      <div>{children}</div>
    </Card>
  );
};

export default TitledCard;
