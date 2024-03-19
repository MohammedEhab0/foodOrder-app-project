import { useContext } from "react";
import LogoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumOfItems, item) => {
    return totalNumOfItems + item.quantity;
  }, 0);
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={LogoImg} alt="a restaurant" />
        <h1>Food App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          {" "}
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
