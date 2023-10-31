import React from "react";

import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <>
      <div className="q-dashboard-section">
        <Sidebar />
        {children}
      </div>
    </>
  );
}

export default MainLayout;
