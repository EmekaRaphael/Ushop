import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {

  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.isAdmin;

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
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
      </Switch>  
    </Router>
  );
}

export default App;


// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./App.css";
// import Home from "./pages/home/Home";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";
// import Login from "./pages/login/Login";
// import { useSelector } from "react-redux";

// function App() {

//   const currentUser = useSelector((state) => state.user?.currentUser);
//   const admin = currentUser?.isAdmin; 

//   return (
//     <Router>
//       <Switch>
//           <Route path="/login">
//             <Login />
//           </Route>
//         {admin && (
//             <>
//               <Topbar />
//               <div className="container">
//                 <Sidebar />
//                   <Route exact path="/">
//                     <Home />
//                   </Route>
//                   <Route path="/users">
//                     <UserList />
//                   </Route>
//                   <Route path="/user/:userId">
//                     <User />
//                   </Route>
//                   <Route path="/newUser">
//                     <NewUser />
//                   </Route>
//                   <Route path="/products">
//                     <ProductList />
//                   </Route>
//                   <Route path="/product/:productId">
//                     <Product />
//                   </Route>
//                   <Route path="/newproduct">
//                     <NewProduct />
//                   </Route>
//               </div>
//             </>
//           )
//         }
//       </Switch>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./App.css";
// import Home from "./pages/home/Home";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";
// import Login from "./pages/login/Login";

// function App() {
//   const currentUser = useSelector((state) => state.user?.currentUser);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading delay (optional if you're reading from localStorage, async API, etc.)
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500); // Adjust time or remove if you rely on actual auth loading

//     return () => clearTimeout(timer);
//   }, [currentUser]);

//   const admin = currentUser?.isAdmin;

//   if (loading) {
//     return (
//       <div className="loading-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       {admin && <Topbar />}
//       <div className="container">
//         {admin && <Sidebar />}
//         <Switch>
//           <Route path="/login">
//             {admin ? <Redirect to="/" /> : <Login />}
//           </Route>

//           {admin ? (
//             <>
//               <Route exact path="/">
//                 <Home />
//               </Route>
//               <Route path="/users">
//                 <UserList />
//               </Route>
//               <Route path="/user/:userId">
//                 <User />
//               </Route>
//               <Route path="/newUser">
//                 <NewUser />
//               </Route>
//               <Route path="/products">
//                 <ProductList />
//               </Route>
//               <Route path="/product/:productId">
//                 <Product />
//               </Route>
//               <Route path="/newproduct">
//                 <NewProduct />
//               </Route>
//             </>
//           ) : (
//             <Redirect to="/login" />
//           )}
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;
