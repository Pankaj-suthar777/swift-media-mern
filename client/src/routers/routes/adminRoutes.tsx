import AdminDashboard from "../../pages/admin/AdminDashboard";

export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
];
