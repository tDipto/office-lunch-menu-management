import React from "react";

const EmployeeCard = ({ data }) => {
  return (
    <div>
      {/* <h1>Menu card</h1> */}
      {/* {console.log(data)} */}
      <div className="p-10">
        <p>{data.employee.username}</p>
        <p>Choices:</p>
        <ul>
          {data.choices.map((choice) => (
            <li>{choice}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeCard;
