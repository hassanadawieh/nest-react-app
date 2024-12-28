import { Outlet } from "react-router-dom";
import Layout from "../components/layout/Layout";


const Dashboard = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Dashboard;
