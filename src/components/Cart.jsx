import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCTX = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCTX.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleGotoCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCTX.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCTX.addItem(item)}
            onDecrease={() => cartCTX.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{cartTotal}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          {" "}
          Close
        </Button>
        {cartCTX.items.length > 0 && (
          <Button onClick={handleGotoCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
