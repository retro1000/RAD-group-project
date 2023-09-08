import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../component_style/numberedListStyle.css"

function NumberedList() {
  return (
    <div>
      <ListGroup as="ol" numbered>
        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default NumberedList;