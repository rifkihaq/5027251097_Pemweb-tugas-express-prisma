import { Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}