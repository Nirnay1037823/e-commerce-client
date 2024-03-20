import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Category from "./pages/Category";
import SignInPage from "./pages/SignInPage";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import ViewCategories from "./pages/ViewCategories";
import ViewProducts from "./pages/ViewProducts";
import LinkProduct from "./pages/LinkProduct";
import UpdateCategory from "./pages/UpdateCategory";

function App() {
  return (
    <>
      <NavBar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/view-categories" element={<ViewCategories />} />
          <Route path="/view-products" element={<ViewProducts />} />
          <Route path="/link-product/:id" element={<LinkProduct />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
