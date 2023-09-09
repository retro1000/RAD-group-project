import React from 'react';

const TableComponentSteps = (props) => {
  const { tableData } = props;

  return (
    <div className='steps-table'>
      <h2>Steps</h2>
      <table>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponentSteps;