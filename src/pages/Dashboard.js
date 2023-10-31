import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import MainLayout from "../components/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <DashboardContent />
    </MainLayout>
  );
}

export default Dashboard;
