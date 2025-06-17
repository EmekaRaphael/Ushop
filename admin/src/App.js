import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import NotAuthorized from "./pages/NotAuthorized";
import { useSelector } from "react-redux";


function App() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const admin = currentUser?.isAdmin;

  return (
    <Router>
      <Switch>
        {/* Public login route */}
        <Route path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
        </Route>

        {/* Admin-protected layout and routes */}
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}

        {/* If logged in but not admin → Not Authorized */}
        {!admin && currentUser && (
          <Route path="*">
            <NotAuthorized />
          </Route>
        )}

        {/* If not logged in at all → redirect unknown routes to login */}
        {!currentUser && (
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;