// src/hooks/useUserActions.js
import { useDispatch } from "react-redux";
import { useToast } from "./useToast";
import {
  getCartlist,
  addCartlist,
  editCartlist,
  deleteCartlist,
} from "../../src/services";

import {
  addWishlistItem,
  removeWishlistItem,
  setLoadText,
  setLoading,
  setCart,  // IMPORTANT
} from "../redux/slices/dataSlice";

export const useUserActions = () => {
  const dispatch = useDispatch();
  const { successToast } = useToast();
  const token = localStorage.getItem("login");

  // ------------ WISHLIST -----------------
  async function addWish(product) {
    if (!token) return;
    await dispatch(addWishlistItem({ product, token })).unwrap();
    successToast(`${product.title} added to Wishlist...`);
  }

  async function deleteWish(productId) {
    if (!token) return;
    await dispatch(removeWishlistItem({ productId, token })).unwrap();
    successToast("Removed from Wishlist");
  }

  // ------------ CART -----------------
  async function addCart(product) {
    dispatch(setLoading(true));
    dispatch(setLoadText("Adding..."));

    const responseCart = await getCartlist({ encodedToken: token });

    if (!responseCart.data.cart.find((item) => item._id === product._id)) {
      const res = await addCartlist({ product, encodedToken: token });
      dispatch(setCart(res.data.cart)); // FIX
    } else {
      const res = await editCartlist({
        productId: product._id,
        encodedToken: token,
        type: "increment",
      });
      dispatch(setCart(res.data.cart)); // FIX
    }

    dispatch(setLoadText(""));
    dispatch(setLoading(false));
    successToast(`${product.title} added to Cart...`);
  }

  async function deleteCart(productId) {
    dispatch(setLoading(true));
    dispatch(setLoadText("Removing..."));

    const res = await deleteCartlist({ productId, encodedToken: token });
    dispatch(setCart(res.data.cart)); // FIX

    dispatch(setLoadText(""));
    dispatch(setLoading(false));
  }

  async function incrementCart(product) {
    const res = await editCartlist({
      productId: product._id,
      encodedToken: token,
      type: "increment",
    });
    dispatch(setCart(res.data.cart));
  }

  async function decrementCart(product) {
    const res = await editCartlist({
      productId: product._id,
      encodedToken: token,
      type: "decrement",
    });
    dispatch(setCart(res.data.cart));
  }

  return { addWish, deleteWish, addCart, deleteCart, incrementCart, decrementCart };
};
