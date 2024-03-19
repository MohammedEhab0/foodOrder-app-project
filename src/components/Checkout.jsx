import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../Hooks/useHttp.jsx";
import Error from "./Error";
const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handlFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const CustomerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: CustomerData,
        },
      })
    );
  }

  let action = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        close
      </Button>
      <Button> Submit Order</Button>
    </>
  );
  if (isSending) {
    action = <span>sending order data .....</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handlFinish}
      >
        <h2> Success!</h2>
        <p> your order submit Successfully </p>
        <p> we will get back to you with more details</p>
        <p className="modal-actions">
          <Button onClick={handlFinish}>okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p> Total Amount {cartTotal}</p>
        <Input type="text" lable="Full Name" id="name"></Input>
        <Input type="email" lable="E-mail Address" id="email"></Input>
        <Input type="text" lable="Street" id="street"></Input>
        <div className="control-row">
          <Input type="text" lable="City" id="city"></Input>
          <Input type="text" lable="Postal Code" id="postal-code"></Input>
        </div>
        {error && <Error title="field to submit order" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
