import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/router';
import NotFound from './pages/notFound/NotFound';
import Layout from './pages/Layout';
import RequireAuth from './hooks/RequireAuth';
import PersistLogin from './context/PersistLogin';
import HomeTeller from './pages/teller/home/Home';
import HomeOwner from './pages/owner/home/HomeOwner';
import ManageOrder from './pages/teller/manageOrder/ManageOrder';
import ListOrder from './pages/teller/listOrder/ListOrder';
import CreateOrder from './pages/teller/createOrder/CreateOrder';
import Home from './pages/admin/home/Home';
import DetailOrder from './pages/teller/detailOrder/DetailOrder';
import HistoryOrder from './pages/teller/historyOrder/HistoryOrder';
import ManageEmployee from './pages/owner/manageEmployee/ManageEmployee';
import ManageProduct from './pages/owner/manageProduct/ManageProduct';
import ManageOrderOwner from './pages/owner/manageOrderOwner/ManageOrderOwner';
import ManageDiscount from './pages/owner/manageDiscount/ManageDiscount';
import ManageService from './pages/owner/manageService/ManageService';
import CreateProduct from './pages/owner/createProduct/CreateProduct';
import ListProduct from './pages/owner/listProduct/ListProduct';
import ProductDetail from './pages/owner/productDetail/ProductDetail';

const ROLES = {
  Owner: "Owner",
  Teller: "Teller",
  Admin: "Admin",
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public router */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Page />}
            />
          )
        })}
        {/* private router */}

        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
            <Route path="/" element={<Home />} />
          </Route>
          {/* Page của Teller */}
          <Route element={<RequireAuth allowedRoles={ROLES.Teller} />}>
            <Route path="teller" element={<HomeTeller />} />
            <Route path="manage-order" element={<ManageOrder />}>
              <Route path="create-order" index element={<CreateOrder />} />
              <Route path="list-order" element={<ListOrder />} />
              <Route path=":orderId" element={<DetailOrder />} />
              <Route path="history-order" element={<HistoryOrder />} />
            </Route>
          </Route>
          {/* Page của Owner */}
          <Route element={<RequireAuth allowedRoles={ROLES.Owner} />}>
            <Route path="owner" index element={<HomeOwner />} />
            <Route path="manage-employees" element={<ManageEmployee />} />

            <Route path="manage-products" element={<ManageProduct />}>
              <Route index element={<ListProduct />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path=":productId" element={<ProductDetail />} />
            </Route>

            <Route path="manage-orders-owner" element={<ManageOrderOwner />} />
            <Route path="manage-discounts" element={<ManageDiscount />} />
            <Route path="manage-services" element={<ManageService />} />
          </Route>

        </Route>


        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
