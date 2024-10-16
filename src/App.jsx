import { ToastContainer } from "react-toastify";
import "./App.css";
import AddProduct from "./Component/AddProduct";
import ProductDetails from "./Component/ProductDetails";
import ProductList from "./Component/ProductList";

function App() {
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList />
      <ProductDetails />
      <ToastContainer />
    </div>
  );
}

export default App;
