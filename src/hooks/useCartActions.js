import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function useCartActions(showToast) {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, id: product._id }));

    if (showToast) {
      showToast("Successfully added to cart!", "success");
    }
  };

  return { handleAddToCart };
}
