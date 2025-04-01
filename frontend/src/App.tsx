import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./conext/CartContext";
import BooksPage from "./pages/BooksPage";
import AdminBookPage from "./pages/AdminBookPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BooksPage />} />
          <Route path='/projects' element={<BooksPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/adminbooks' element={<AdminBookPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  );
}

export default App;