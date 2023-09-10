import React from "react";

const TableComponentDetails = (props) => {
  return (
    <div className="details-table">
      <h2>Details</h2>
      {
        (props.type !== null && props.difficulty !== null && props.equipment !== null)?
        <table>
          <tbody>
            <tr>
              <td>{props.type}</td>
              <td>{props.difficulty}</td>
              <td>{props.equipment}</td>
            </tr>
          </tbody>
        </table>
      :null}
    </div>
  );
};

export default TableComponentDetails;
