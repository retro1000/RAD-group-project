import React from "react";
import Table from "react-bootstrap/Table";
import "../component_style/customTableStyles.css";

function CustomTable(props) {
  return (
    <div>
      {props.tableData !== null && props.tableData !== undefined ? (
        <Table striped bordered hover className="custom-table">
          {" "}
          {/* Apply the custom CSS class */}
          <tbody>
            {props.tableData.map((data) => (
              <tr>
                <td>1</td>
                <td>Mark</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
}

export default CustomTable;
