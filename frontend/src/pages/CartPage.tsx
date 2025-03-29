import React, { useContext, useEffect } from "react";
import { useCart, CartItem } from "../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    toast.info("🛒 Welcome to Your Cart!", { autoClose: 2000 });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">🛒 Shopping Cart</h2>
      
      <ToastContainer />

      {/* Accordion to Show/Hide Cart Details */}
      <div className="accordion" id="cartAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              📖 View Cart Details
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item: CartItem) => (
                        <tr key={item.bookID}>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm"
                              onClick={() => removeFromCart(item.bookID, item.title)}
                            >
                              ❌ Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h4>Total: ${total.toFixed(2)}</h4>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="checkoutModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Checkout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to proceed with checkout?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success">Yes, Checkout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping Button */}
      <button
        className="btn btn-secondary mt-3"
        onClick={() => (window.location.href = "/")}
      >
        ← Continue Shopping
      </button>
    </div>
  );
};

export default Cart;
