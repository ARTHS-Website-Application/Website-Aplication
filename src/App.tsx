import { Routes, Route } from 'react-router-dom';
import { publicRoutes} from './routes/router';
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
// import PersistLogin from './context/PersistLogin';

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
          
          <Route element={<PersistLogin/>}>
            {/* {privateRoutes.map((route, index) => {
              const Page = route.component;
              return(
                <Route key={index} element={<RequireAuth allowedRoles={[route.allowedRoles]}/>}>
                  <Route  path={route.path} element={<Page />} />
                </Route>
              )
            })} */}
            <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={ROLES.Teller} />}>
            <Route path="teller" element={<HomeTeller />}/>
            <Route path="manage-order" element={<ManageOrder />}>
              <Route path="list-order" element={<ListOrder />}/>
              <Route path="create-order" element={<CreateOrder />}/>
            </Route>

          </Route>
          <Route element={<RequireAuth allowedRoles={ROLES.Owner} />}>
            <Route path="owner" element={<HomeOwner />}/>
          </Route>
          </Route>
          

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
