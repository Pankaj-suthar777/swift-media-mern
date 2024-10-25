import AdminDashboard from "../../pages/admin/AdminDashboard";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
];
