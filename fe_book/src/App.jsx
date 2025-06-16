import { Route, Routes, useLocation } from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import BookManagement from "./components/Admin/BookManagement";
import CreateBook from "./components/Admin/CreateBook";
import EditBookPage from "./components/Admin/EditBookPage";
import OrderManagement from "./components/Admin/OrderManagement";
import Usermanagement from "./components/Admin/Usermanagement";
import BestSeller from "./components/Books/BestSeller";
import BookDetail from "./components/Books/BookDetail";
import FeaturedBook from "./components/Books/FeaturedBook";
import Checkout from "./components/Cart/Checkout";
import Navbar from "./components/Common/Navbar";
import AdminHomePages from "./pages/AdminPage/AdminHomePages";
import AllBooks from "./pages/AllBooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import OrderComfirm from "./pages/OrderComfirm";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AdminPrivateRoute from "./utils/PrivateRoute";

function App() {
  const location = useLocation();

  // Hide Navbar for admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/bestsellers" element={<BestSeller />} />
          <Route path="/featured" element={<FeaturedBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='order-confirmation' element={<OrderComfirm />} />
          <Route path='order/:id' element={<OrderDetail />} />
          <Route path='my-orders' element={<MyOrders />} />

          {/* ADMIN LAYOUT */}
          <Route path="/admin" element={<AdminPrivateRoute role="admin"><AdminLayout /></AdminPrivateRoute>}>
            <Route index element={<AdminHomePages />} />
            <Route path="users" element={<Usermanagement />} />
            <Route path="products" element={<BookManagement />} />
            <Route path="products/create" element={<CreateBook />} />
            <Route path='books/:id/edit' element={<EditBookPage />} />
            <Route path='orders' element={<OrderManagement />} />
          </Route>
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;