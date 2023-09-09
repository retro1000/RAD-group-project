import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../component_style/numberedListStyle.css";

function NumberedList(props) {
  return (
    <div>
      {props.steps !== null && props.steps !== undefined ? (
        <ListGroup as="ol" numbered>
          {props.steps.map((li) => (
            <ListGroup.Item as="li">{li}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : null}
    </div>
  );
}

export default NumberedList;
