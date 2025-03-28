import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';


function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  return (
    <div>
      <h2>Your cart:</h2>
      <div>
        {cartItems.length == 0 ? (
          <p>Your cart is empty.</p>
        ) : (
            <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <h4>Total: ${total.toFixed(2)}</h4>
      <button>Checkout</button>
      <button onClick={() => {
              const savedState = localStorage.getItem("continueShoppingState");

              if (savedState) {
                const { page, size, category } = JSON.parse(savedState);
                const query = new URLSearchParams();

                if (category) query.append("category", category);
                if (page) query.append("pageNum", page);
                if (size) query.append("pageSize", size);

                const url = `/?${query.toString()}`;
                window.location.href = url;
              } else {
                // fallback
                window.location.href = "/";
              }
            }}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;