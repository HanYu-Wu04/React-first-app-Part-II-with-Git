import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key = {index}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
                      <button onClick={() =>
                              props.removeOneCharacter(row.id)}>
                              Delete
                      </button>
        </td>
      </tr>
    );
   }
  );
  return (
      <tbody>
        {rows}
      </tbody>
  );
}

function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} 
                    removeOneCharacter={props.removeOneCharacter}/>
      </table>
    );
}

export default Table;