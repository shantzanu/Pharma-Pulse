import React from 'react';
import MasterCards from './MasterCards';
const Master = () => {
  return (
    <div>
      <MasterCards title="Employee" path="/employee" />
      <MasterCards title="Salary" path="/salary" />
      <MasterCards title="Leaves" path="/leaves" />
    </div>
  );
};

export default Master;
