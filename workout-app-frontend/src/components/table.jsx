import React from 'react';
import Table from 'react-bootstrap/Table';
import '../component_style/customTableStyles.css';

function CustomTable() {
  return (
    <div>
      <Table striped bordered hover className="custom-table"> {/* Apply the custom CSS class */}
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CustomTable;