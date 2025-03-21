import { setupProducts } from "./products";
import { setupCounter } from "./counter";
import { setupCart } from "./cart";

async function main() {
  const { updateCount: updateProductCount, getProductById } =
    await setupProducts({
      container: document.querySelector("#products"),
      onDecreaseClick,
      onIncreaseClick,
    });

  const {
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    updateCount: updateCartCount,
  } = setupCart({
    container: document.querySelector(".cart_items"),
    onDecreaseClick,
    onIncreaseClick,
  });

  const { increase, decrease, getTotalCount, getCountByProductId } =
    setupCounter();

  const updateTotalCount = (totalCount) => {
    document.querySelector(".total_count").innerHTML = `(${totalCount})`;
  };

  function onIncreaseClick({ productId }) {
    if (getCountByProductId({ productId }) === 0) {
      addProductToCart({ product: getProductById({ productId }) });
    }
    increase({ productId });
    updateTotalCount(getTotalCount());
  }

  function onDecreaseClick({ productId }) {
    const count = decrease({ productId });
    if (count === 0) {
      removeProductFromCart({ product: getProductById({ productId }) });
    }
    updateTotalCount(getTotalCount());
  }

  document.querySelector(".btn-cart").addEventListener("click", () => {
    document.body.classList.add("displaying_cart");
  });

  document.querySelector(".btn-close-cart").addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });

  document.querySelector(".cart-dimmed-bg").addEventListener("click", () => {
    document.body.classList.remove("displaying_cart");
  });
}

main();
