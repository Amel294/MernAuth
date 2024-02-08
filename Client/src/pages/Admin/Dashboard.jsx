import React from 'react';
import CustomTable from './CustomTable';

function Dashboard() {
  const username = "amel";
  const email = "amel294@gmail.com";

  return (
    <div className="relative px-10 pt-10 overflow-x-auto">
      <CustomTable username={username} email={email} />
    </div>
  );
}

export default Dashboard;
