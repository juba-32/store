import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorites } from "../redux/cartSlice";   

export default function useProductActions(product, showToast) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.cart.favorites) || [];
  const isFavorite = product ? favorites.some((item) => item._id === product._id) : false;

  const handleFavClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!product) return;

    dispatch(addToFavorites(product));

    if (showToast) {
      if (isFavorite) {
        showToast("Removed from favorites", "info");
      } else {
        showToast("Added to favorites successfully!", "success");
      }
    }
  };

  const handleAddToCart = (customQty = 1) => {
    if (!product) return;

    dispatch(addToCart({ ...product, id: product._id, qty: customQty }));

    if (showToast) {
      showToast("Successfully added to cart!", "success");
    }
  };

  return {
    isFavorite,
    handleFavClick,
    handleAddToCart,
  };
}